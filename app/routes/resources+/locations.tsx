import { type Prisma } from '@prisma/client'
import { type SelectProps } from '@radix-ui/react-select'
import { Link, useFetcher } from '@remix-run/react'
import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/server-runtime'
import { useId, useState } from 'react'
import { useSpinDelay } from 'spin-delay'
import { z } from 'zod'
import { ErrorList, type ListOfErrors } from '~/components/forms.tsx'
import { Spinner } from '~/components/spinner.tsx'
import { Button } from '~/components/ui/button.tsx'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '~/components/ui/command.tsx'
import { Icon } from '~/components/ui/icon.tsx'
import { Label } from '~/components/ui/label.tsx'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/components/ui/popover.tsx'
import { prisma } from '~/utils/db.server.ts'
import { cn } from '~/utils/misc.tsx'
import { getTableParams } from '~/utils/request.helper.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'

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

export const LocationSchema = z.object({
	name: z.string().min(1),
})

export const LocationSearch = ({
	labelProps,
	selectProps,
	errors,
	className,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	selectProps: SelectProps
	errors?: ListOfErrors
	className?: string
}) => {
	const [open, setOpen] = useState(false)
	const fallbackId = useId()
	const id = selectProps.name ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined
	const locationsFetcher = useFetcher<typeof loader>()
	const locations = locationsFetcher.data?.locations ?? []
	type Location = (typeof locations)[number]
	const [selectedLocation, setSelectedLocation] = useState<
		null | undefined | Partial<Location>
	>(null)

	const busy = locationsFetcher.state !== 'idle'
	const delayedBusy = useSpinDelay(busy, {
		delay: 150,
		minDuration: 500,
	})

	return (
		<div className={cn('flex flex-col', className)}>
			<input
				name="location"
				// A hack to allow errors to be displayed as type="hidden" is not supported
				onChange={() => {}}
				value={selectedLocation?.name ?? ''}
				className="hidden"
			/>
			<Label htmlFor={id} className="pb-2" {...labelProps} />
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						// A hack to show error border and "revailidate" on blur
						className={cn(
							'min-w-[200px] justify-between whitespace-nowrap ',
							errorId && selectedLocation === null && 'border-input-invalid',
						)}
					>
						{selectedLocation ? selectedLocation.name : 'Select location...'}
						<Icon
							name="caret-sort"
							className="ml-2 h-4 w-4 shrink-0 opacity-50"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="min-w-fit p-0" align="start">
					<Command shouldFilter={false}>
						<CommandInput
							placeholder="Search locations..."
							className="h-9"
							onFocus={() => {
								locationsFetcher.submit(
									{ search: selectedLocation?.name ?? '' },
									{ method: 'GET', action: '/resources/locations' },
								)
							}}
							onInput={e => {
								locationsFetcher.submit(
									{ search: e.currentTarget.value },
									{ method: 'GET', action: '/resources/locations' },
								)
							}}
						/>
						<Spinner showSpinner={delayedBusy} />
						<CommandList>
							<CommandEmpty className="-mb-2 p-2">
								<Link to="">
									<Button variant="ghost" size="sm" className="w-full">
										<Icon name="plus" className="mr-2 h-4 w-4" />
										Create a new location
									</Button>
								</Link>
							</CommandEmpty>
							<CommandGroup>
								{locations.map(location => (
									<CommandItem
										key={location.name}
										onSelect={currentValue => {
											const location = locations.find(
												location =>
													location.name.toLowerCase() === currentValue,
											)
											setSelectedLocation(
												currentValue === selectedLocation?.name
													? selectedLocation
													: location,
											)
											setOpen(false)
										}}
									>
										{location.name}
										<Icon
											name="check"
											className={cn(
												'ml-auto h-4 w-4',
												selectedLocation?.name === location.name
													? 'opacity-100'
													: 'opacity-0',
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<div className="px-4 pb-3 pt-1">
				{/* // A hack to show error message and "revailidate" on blur */}
				{errorId && selectedLocation === null ? (
					<ErrorList id={errorId} errors={errors} />
				) : null}
			</div>
		</div>
	)
}
