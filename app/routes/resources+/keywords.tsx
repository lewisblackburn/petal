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
	const timings = makeTimings('keywords loader')
	const { search, take } = getTableParams(request, 5, {
		orderBy: 'createdAt',
		order: 'desc',
	})

	const where = {
		OR: search ? [{ name: { contains: search } }] : undefined,
	} satisfies Prisma.KeywordWhereInput

	const keywords = await time(
		() =>
			prisma.keyword.findMany({
				take,
				where,
			}),
		{ timings, type: 'find keywords' },
	)

	return json(
		{ keywords },
		{ headers: { 'Server-Timing': timings.toString() } },
	)
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export const KeywordSearch = ({
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
	const keywordsFetcher = useFetcher<typeof loader>()
	const keywords = keywordsFetcher.data?.keywords ?? []
	type Keyword = (typeof keywords)[number]
	const [selectedKeyword, setSelectedKeyword] = useState<
		null | undefined | Keyword
	>(null)

	const busy = keywordsFetcher.state !== 'idle'
	const delayedBusy = useSpinDelay(busy, {
		delay: 150,
		minDuration: 500,
	})

	return (
		<>
			<input
				name="keywordId"
				// A hack to allow errors to be displayed as type="hidden" is not supported
				defaultValue={selectedKeyword?.id ?? ''}
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
							errorId && selectedKeyword === null && 'border-input-invalid',
						)}
					>
						{selectedKeyword ? selectedKeyword.name : 'Select keyword...'}
						<Icon
							name="caret-sort"
							className="ml-2 h-4 w-4 shrink-0 opacity-50"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="min-w-fit p-0" align="start">
					<Command shouldFilter={false}>
						<CommandInput
							placeholder="Search keywords..."
							className="h-9"
							onFocus={() => {
								keywordsFetcher.submit(
									{ search: selectedKeyword?.name ?? '' },
									{ method: 'GET', action: '/resources/keywords' },
								)
							}}
							onInput={e => {
								keywordsFetcher.submit(
									{ search: e.currentTarget.value },
									{ method: 'GET', action: '/resources/keywords' },
								)
							}}
						/>
						<Spinner showSpinner={delayedBusy} />
						<CommandEmpty>No keyword found.</CommandEmpty>
						<CommandGroup>
							{keywords.map(keyword => (
								<CommandItem
									key={keyword.name}
									onSelect={currentValue => {
										const keyword = keywords.find(
											keyword => keyword.name.toLowerCase() === currentValue,
										)
										setSelectedKeyword(
											currentValue === selectedKeyword?.name
												? selectedKeyword
												: keyword,
										)
										setOpen(false)
									}}
								>
									{keyword.name}
									<Icon
										name="check"
										className={cn(
											'ml-auto h-4 w-4',
											selectedKeyword?.name === keyword.name
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
				{errorId && selectedKeyword === null ? (
					<ErrorList id={errorId} errors={errors} />
				) : null}
			</div>
		</>
	)
}
