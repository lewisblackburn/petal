import { parse } from '@conform-to/zod'
import { type Prisma } from '@prisma/client'
import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { useSpinDelay } from 'spin-delay'
import { z } from 'zod'
import {
	SearchSelectField,
	type ListOfErrors,
	type PopoverProps,
} from '#app/components/forms.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getTableParams } from '#app/utils/request.helper.ts'

export async function loader({ request }: LoaderFunctionArgs) {
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

const NewPersonSchema = z.object({
	name: z.string().min(1).max(50),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)

	const formData = await request.formData()

	const submission = parse(formData, {
		schema: NewPersonSchema,
	})
	if (!submission.value) {
		return json(
			{
				status: 'error',
				submission,
			} as const,
			{ status: 400 },
		)
	}

	const { name } = submission.value

	const person = await prisma.person.create({
		data: { name },
	})

	return json({ person })
}

export const PersonSearch = ({
	...props
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: PopoverProps
	errors?: ListOfErrors
	className?: string
}) => {
	const fetcher = useFetcher<typeof loader>()

	const handleSearch = (e: any) => {
		const searchValue = e.currentTarget.value

		fetcher.submit(
			{ search: searchValue },
			{ method: 'GET', action: '/resources/people' },
		)
	}

	const busy = fetcher.state !== 'idle'
	const delayedBusy = useSpinDelay(busy, {
		delay: 150,
		minDuration: 500,
	})

	const handleCreate = (value: string) => {
		fetcher.submit(
			{ name: value },
			{ method: 'POST', action: '/resources/people' },
		)
		setTimeout(() => {
			fetcher.submit(
				{ search: value },
				{ method: 'GET', action: '/resources/people' },
			)
		}, 400)
	}

	const items = fetcher.data?.people?.map(person => ({
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
