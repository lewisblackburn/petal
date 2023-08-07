import { type Prisma } from '@prisma/client'
import { useFetcher, useLocation } from '@remix-run/react'
import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/server-runtime'
import { FilterSelectField, type ListOfErrors } from '~/components/forms.tsx'
import { type PopoverProps } from '~/components/ui/popover.tsx'
import { prisma } from '~/utils/db.server.ts'
import { getTableParams } from '~/utils/request.helper.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'
import { useSpinDelay } from 'spin-delay'

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
				include: {
					photos: {
						take: 1,
						where: {
							primary: true,
						},
					},
				},
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

export const PersonSearch = ({
	...props
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: PopoverProps
	errors?: ListOfErrors
	className?: string
}) => {
	const path = useLocation().pathname
	const peopleFetcher = useFetcher<typeof loader>()

	const busy = peopleFetcher.state !== 'idle'
	const delayedBusy = useSpinDelay(busy, {
		delay: 150,
		minDuration: 500,
	})

	const items = peopleFetcher.data?.people?.map(person => ({
		label: person.name,
		value: person.id,
		image: person.photos[0]?.image,
	}))

	return (
		<FilterSelectField
			{...props}
			items={items}
			busy={delayedBusy}
			notFound={`/people/new?redirectTo=${path}`}
			onFocus={() => {
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
			}}
		/>
	)
}
