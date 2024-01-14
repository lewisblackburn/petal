import { type Prisma } from '@prisma/client'
import { useFetcher } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { useSpinDelay } from 'spin-delay'
import { SearchSelectField, type ListOfErrors, PopoverProps } from '#app/components/forms.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { getTableParams } from '#app/utils/request.helper.ts'
import { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  const { search, take } = getTableParams(request, 5, {
    orderBy: 'createdAt',
    order: 'desc',
  })

  const where = {
    OR: search ? [{ name: { contains: search } }] : undefined,
  } satisfies Prisma.GenreWhereInput

  const genres = await prisma.genre.findMany({
    take,
    where,
  })

  return json({ genres })
}

export const GenreSearch = ({
  ...props
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
  buttonProps: PopoverProps
  errors?: ListOfErrors
  className?: string
}) => {
  const genresFetcher = useFetcher<typeof loader>()

  const handleSearch = (e: any) => {
    const searchValue = e.currentTarget.value

    genresFetcher.submit(
      { search: searchValue },
      { method: 'GET', action: '/resources/genres' },
    )
  }

  const busy = genresFetcher.state !== 'idle'
  const delayedBusy = useSpinDelay(busy, {
    delay: 150,
    minDuration: 500,
  })

  const items = genresFetcher.data?.genres?.map(person => ({
    label: person.name,
    value: person.id,
  }))

  return (
    <SearchSelectField
      {...props}
      items={items}
      busy={delayedBusy}
      onFocus={handleSearch}
      onInput={handleSearch}
      onCreate={() => { }}
    />
  )
}
