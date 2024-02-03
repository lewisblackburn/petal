import { type Prisma } from '@prisma/client'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { useSpinDelay } from 'spin-delay'
import {
	SearchSelectField,
	type ListOfErrors,
	type PopoverProps,
} from '#app/components/forms.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { getTableParams } from '#app/utils/request.helper.ts'

export async function loader({ request }: LoaderFunctionArgs) {
	const { search, take } = getTableParams(request, 5, {
		orderBy: 'createdAt',
		order: 'desc',
	})

	const where = {
		OR: search ? [{ name: { contains: search } }] : undefined,
	} satisfies Prisma.ProductionCompanyWhereInput

	const companies = await prisma.productionCompany.findMany({
		take,
		where,
	})

	return json({ companies })
}

export const ProductionCompanySearch = ({
	...props
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: PopoverProps & {
		name: string
		form: string
		value?: string
	}
	errors?: ListOfErrors
	className?: string
}) => {
	const companiesFetcher = useFetcher<typeof loader>()

	const handleSearch = (e: any) => {
		const searchValue = e.currentTarget.value

		companiesFetcher.submit(
			{ search: searchValue },
			{ method: 'GET', action: '/resources/productionCompanies' },
		)
	}

	const busy = companiesFetcher.state !== 'idle'
	const delayedBusy = useSpinDelay(busy, {
		delay: 150,
		minDuration: 500,
	})

	const items = companiesFetcher.data?.companies?.map(company => ({
		label: company.name,
		value: company.id,
		image: company.logo,
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
