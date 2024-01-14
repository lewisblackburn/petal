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
	} satisfies Prisma.LanguageWhereInput

	const languages = await prisma.language.findMany({
		take,
		where,
	})

	return json({ languages })
}

export const LanguageSearch = ({
	...props
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: PopoverProps
	errors?: ListOfErrors
	className?: string
}) => {
	const languagesFetcher = useFetcher<typeof loader>()

	const handleSearch = (e: any) => {
		const searchValue = e.currentTarget.value

		languagesFetcher.submit(
			{ search: searchValue },
			{ method: 'GET', action: '/resources/languages' },
		)
	}

	const busy = languagesFetcher.state !== 'idle'
	const delayedBusy = useSpinDelay(busy, {
		delay: 150,
		minDuration: 500,
	})

	const items = languagesFetcher.data?.languages?.map(language => ({
		label: language.name,
		value: language.id,
	}))

	return (
		<SearchSelectField
			{...props}
			items={items}
			busy={delayedBusy}
			onFocus={handleSearch}
			onInput={handleSearch}
			onCreate={() => {}}
		/>
	)
}
