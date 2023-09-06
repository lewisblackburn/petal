import { type Prisma } from '@prisma/client'
import { useFetcher } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { useSpinDelay } from 'spin-delay'
import { SearchSelectField, type ListOfErrors } from '#app/components/forms.tsx'
import { type PopoverProps } from '#app/components/ui/popover.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { getTableParams } from '#app/utils/request.helper.ts'

export async function loader({ request }: DataFunctionArgs) {
	const { search, take } = getTableParams(request, 5, {
		orderBy: 'createdAt',
		order: 'desc',
	})

	const where = {
		OR: search ? [{ name: { contains: search } }] : undefined,
	} satisfies Prisma.PersonWhereInput

	const people = await prisma.person.findMany({
		take,
		where,
		select: {
			id: true,
			name: true,
			image: true,
		},
	})

	return json({ people })
}

export const PersonSearch = ({
	...props
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: PopoverProps
	errors?: ListOfErrors
	className?: string
}) => {
	const peopleFetcher = useFetcher<typeof loader>()

	const handleSearch = (e: any) => {
		const searchValue = e.currentTarget.value

		peopleFetcher.submit(
			{ search: searchValue },
			{ method: 'GET', action: '/resources/people' },
		)
	}

	const busy = peopleFetcher.state !== 'idle'
	const delayedBusy = useSpinDelay(busy, {
		delay: 150,
		minDuration: 500,
	})

	// FIX: This should not return with redirect when creating a new person from here but
	// it should from everywhere else
	const handleCreate = (value: string) => {
		peopleFetcher.submit(
			{ name: value },
			{ method: 'POST', action: '/resources/person-editor' },
		)
		setTimeout(() => {
			peopleFetcher.submit(
				{ name: value },
				{ method: 'GET', action: '/resources/people' },
			)
		}, 400)
	}

	const items = peopleFetcher.data?.people?.map(person => ({
		label: person.name,
		value: person.id,
		image: person.image,
	}))

	return (
		<SearchSelectField
			{...props}
			items={items}
			busy={delayedBusy}
			onFocus={handleSearch}
			onInput={handleSearch}
			onCreate={handleCreate}
		/>
	)
}
