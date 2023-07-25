import { type Prisma } from '@prisma/client'
import { useFetcher } from '@remix-run/react'
import {
  json,
  type DataFunctionArgs,
  type HeadersFunction,
} from '@remix-run/server-runtime'
import { useState } from 'react'
import { useSpinDelay } from 'spin-delay'
import { Spinner } from '~/components/spinner.tsx'
import { Input } from '~/components/ui/input.tsx'
import { prisma } from '~/utils/db.server.ts'
import { getTableParams } from '~/utils/request.helper.ts'
import {
  combineServerTimings,
  makeTimings,
  time,
} from '~/utils/timing.server.ts'

export async function loader({ request }: DataFunctionArgs) {
  const timings = makeTimings('people loader')
  const { search, take } = getTableParams(request, 5, {
    orderBy: 'createdAt',
    order: 'desc',
  })

  const where = {
    OR: search ? [{ name: { contains: search } }] : undefined,
  } satisfies Prisma.PersonWhereInput

  const people = await time(
    () =>
      prisma.person.findMany({
        take,
        where,
      }),
    { timings, type: 'find people' },
  )

  return json({ people }, { headers: { 'Server-Timing': timings.toString() } })
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
  return {
    'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
  }
}

export async function action({ request }: DataFunctionArgs) {
  const form = await request.formData()

  console.log('here', request, form)

  return json({ status: 'success' })
}

// TODO: Debounce the search
export const PersonSearch = () => {
  const peopleFetcher = useFetcher<typeof loader>()
  const [value, setValue] = useState('')
  const people = peopleFetcher.data?.people ?? []
  type Person = (typeof people)[number]
  const [selectedPerson, setSelectedPerson] = useState<
    null | undefined | Person
  >(null)

  const busy = peopleFetcher.state !== 'idle'
  const showSpinner = useSpinDelay(busy, {
    delay: 150,
    minDuration: 500,
  })

  return (
    <div>
      <div className="relative">
        <input name="personId" type="hidden" value={selectedPerson?.id ?? ''} />
        <Input
          name="name"
          onClick={() => {
            peopleFetcher.submit(
              { search: '' },
              { method: 'GET', action: '/resources/people' },
            )
          }}
          onInput={e => {
            peopleFetcher.submit(
              { search: e.currentTarget.value },
              { method: 'GET', action: '/resources/people' },
            )
            if (selectedPerson) {
              setSelectedPerson(null)
            }
            setValue(e.currentTarget.value)
          }}
          type="text"
          placeholder="Search people"
          value={value}
        />
        <Spinner showSpinner={showSpinner} />
      </div>
      {selectedPerson === null &&
        people.map(person => (
          <div
            key={person.name}
            onClick={() => {
              setSelectedPerson(person)
              setValue(person.name)
            }}
          >
            {person.name}
          </div>
        ))}
    </div>
  )
}
