import { parse } from '@conform-to/zod'
import { type Prisma } from '@prisma/client'
import { useFetcher } from '@remix-run/react'
import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/server-runtime'
import { useState } from 'react'
import { useSpinDelay } from 'spin-delay'
import { z } from 'zod'
import { FilterSelectField, type ListOfErrors } from '~/components/forms.tsx'
import { type PopoverProps } from '~/components/ui/popover.tsx'
import { prisma } from '~/utils/db.server.ts'
import { flashMessage } from '~/utils/flash-session.server.ts'
import { getTableParams } from '~/utils/request.helper.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'

export const LocationSchema = z.object({
	name: z.string(),
})

export async function loader({ request }: DataFunctionArgs) {
	const timings = makeTimings('locations loader')
	const { search, take } = getTableParams(request, 5, {
		orderBy: 'createdAt',
		order: 'desc',
	})

	const where = {
		OR: search ? [{ name: { contains: search } }] : undefined,
	} satisfies Prisma.LocationWhereInput

	const locations = await time(
		() =>
			prisma.location.findMany({
				take,
				where,
			}),
		{ timings, type: 'find locations' },
	)

	return json(
		{ locations },
		{ headers: { 'Server-Timing': timings.toString() } },
	)
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export const PersonEditorSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1),
	knownForDepartment: z.string().min(1),
	biography: z.string().optional(),
	birthdate: z.string().optional(),
	dayOfDeath: z.string().optional(),
	gender: z.string().min(1),
	placeOfBirth: z.string(),
	homepage: z.string().optional(),
	redirectTo: z.string().optional(),
})

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: LocationSchema,
	})
	if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}
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

	const data = {
		name,
	}

	// TODO: add ensurePE and error handling
	await prisma.location.create({
		data,
	})

	return json(
		{ success: true },
		{
			headers: await flashMessage({
				toast: {
					title: 'Created Location',
				},
			}),
		},
	)
}

export const LocationSearch = ({
	...props
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: PopoverProps
	errors?: ListOfErrors
	className?: string
}) => {
	const [value, setValue] = useState('')
	const locationFetcher = useFetcher<typeof loader>()

	const busy = locationFetcher.state !== 'idle'
	const delayedBusy = useSpinDelay(busy, {
		delay: 150,
		minDuration: 500,
	})

	const items = locationFetcher.data?.locations?.map(location => ({
		label: location.name,
		value: location.name,
	}))

	return (
		<FilterSelectField
			{...props}
			items={items}
			busy={delayedBusy}
			onFocus={() => {
				locationFetcher.submit(
					{ search: '' },
					{ method: 'GET', action: '/resources/locations' },
				)
			}}
			onInput={e => {
				setValue(e.currentTarget.value)

				locationFetcher.submit(
					{ search: e.currentTarget.value },
					{ method: 'GET', action: '/resources/locations' },
				)
			}}
			onNotFound={() => {
				// FIX: The list of items should update but it doesn't i have to clost and
				// repoen the popover to see the new items
				// I think this is just a bad way of doing it in general and i'm tired
				locationFetcher.submit(
					{ name: value },
					{ method: 'POST', action: '/resources/locations' },
				)
			}}
		/>
	)
}
