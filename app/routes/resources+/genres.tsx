import { type Prisma } from '@prisma/client'
import { useFetcher } from '@remix-run/react'
import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/server-runtime'
import { useId, useState } from 'react'
import { useSpinDelay } from 'spin-delay'
import { ErrorList, type ListOfErrors } from '~/components/forms.tsx'
import { Spinner } from '~/components/spinner.tsx'
import { Button } from '~/components/ui/button.tsx'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
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
	const timings = makeTimings('genres loader')
	const { search, take } = getTableParams(request, 5, {
		orderBy: 'createdAt',
		order: 'desc',
	})

	const where = {
		OR: search ? [{ name: { contains: search } }] : undefined,
	} satisfies Prisma.GenreWhereInput

	const genres = await time(
		() =>
			prisma.genre.findMany({
				take,
				where,
			}),
		{ timings, type: 'find genres' },
	)

	return json({ genres }, { headers: { 'Server-Timing': timings.toString() } })
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export const GenreSearch = ({
	labelProps,
	inputProps,
	errors,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	inputProps: React.InputHTMLAttributes<HTMLInputElement>
	errors?: ListOfErrors
}) => {
	const [open, setOpen] = useState(false)
	const fallbackId = useId()
	const id = inputProps.id ?? inputProps.name ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined
	const genresFetcher = useFetcher<typeof loader>()
	const genres = genresFetcher.data?.genres ?? []
	type Genre = (typeof genres)[number]
	const [selectedGenre, setSelectedGenre] = useState<null | undefined | Genre>(
		null,
	)

	const busy = genresFetcher.state !== 'idle'
	const delayedBusy = useSpinDelay(busy, {
		delay: 150,
		minDuration: 500,
	})

	return (
		<>
			<input
				name="genreId"
				// A hack to allow errors to be displayed as type="hidden" is not supported
				defaultValue={selectedGenre?.id ?? ''}
				className="hidden"
			/>
			<Label htmlFor={id} {...labelProps} />
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						// A hack to show error border and "revailidate" on blur
						className={cn(
							'w-fit min-w-[200px] justify-between ',
							errorId && selectedGenre === null && 'border-input-invalid',
						)}
					>
						{selectedGenre ? selectedGenre.name : 'Select genre...'}
						<Icon
							name="caret-sort"
							className="ml-2 h-4 w-4 shrink-0 opacity-50"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="min-w-fit p-0" align="start">
					<Command shouldFilter={false}>
						<CommandInput
							placeholder="Search genres..."
							className="h-9"
							onFocus={() => {
								genresFetcher.submit(
									{ search: selectedGenre?.name ?? '' },
									{ method: 'GET', action: '/resources/genres' },
								)
							}}
							onInput={e => {
								genresFetcher.submit(
									{ search: e.currentTarget.value },
									{ method: 'GET', action: '/resources/genres' },
								)
							}}
						/>
						<Spinner showSpinner={delayedBusy} />
						<CommandEmpty>No genre found.</CommandEmpty>
						<CommandGroup>
							{genres.map(genre => (
								<CommandItem
									key={genre.name}
									onSelect={currentValue => {
										const genre = genres.find(
											genre => genre.name.toLowerCase() === currentValue,
										)
										setSelectedGenre(
											currentValue === selectedGenre?.name
												? selectedGenre
												: genre,
										)
										setOpen(false)
									}}
								>
									{genre.name}
									<Icon
										name="check"
										className={cn(
											'ml-auto h-4 w-4',
											selectedGenre?.name === genre.name
												? 'opacity-100'
												: 'opacity-0',
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
			<div className="px-4 pb-3 pt-1">
				{/* // A hack to show error message and "revailidate" on blur */}
				{errorId && selectedGenre === null ? (
					<ErrorList id={errorId} errors={errors} />
				) : null}
			</div>
		</>
	)
}
