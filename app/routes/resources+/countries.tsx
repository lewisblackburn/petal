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
	} satisfies Prisma.CountryWhereInput

	const countries = await prisma.country.findMany({
		take,
		where,
	})

	return json({ countries })
}

export const CountrySearch = ({
	...props
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: PopoverProps
	errors?: ListOfErrors
	className?: string
}) => {
	const countriesFetcher = useFetcher<typeof loader>()

	const handleSearch = (e: any) => {
		const searchValue = e.currentTarget.value

		countriesFetcher.submit(
			{ search: searchValue },
			{ method: 'GET', action: '/resources/countries' },
		)
	}

	const busy = countriesFetcher.state !== 'idle'
	const delayedBusy = useSpinDelay(busy, {
		delay: 150,
		minDuration: 500,
	})

	const items = countriesFetcher.data?.countries?.map(country => ({
		label: `${country.flag} ${country.name}`,
		value: country.code,
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
