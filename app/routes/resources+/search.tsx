import { type LoaderFunctionArgs } from '@remix-run/node'
import { json, useFetcher, useNavigate } from '@remix-run/react'
import { useState, useEffect, useRef } from 'react'
import { useSpinDelay } from 'spin-delay'
import { z } from 'zod'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '#app/components/ui/command.js'
import {
	Dialog,
	DialogContent,
	DialogTitle,
} from '#app/components/ui/dialog.js'
import { prisma } from '#app/utils/db.server.js'
import { useDebounce } from '#app/utils/misc.js'
import { Spinner } from '../../components/spinner'
import { Icon } from '../../components/ui/icon'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

const SearchResultSchema = z.array(
	z.object({
		id: z.string(),
		result: z.string(),
		model: z.string(),
	}),
)

export async function loader({ request }: LoaderFunctionArgs) {
	const searchTerm = new URL(request.url).searchParams.get('search')
	const like = `%${searchTerm ?? ''}%`

	const rawResults = await prisma.$queryRaw`
        SELECT id, title AS "result", 'film' AS "model" FROM Film WHERE title LIKE ${like}
        UNION
        SELECT id, title AS "result", 'song' AS "model" FROM Song WHERE title LIKE ${like}
        UNION
        SELECT id, name AS "result", 'person' AS "model" FROM Person WHERE name LIKE ${like}
        LIMIT 3;
    `

	const result = SearchResultSchema.safeParse(rawResults)

	return json({ results: result.data })
}

export default function Search() {
	const navigate = useNavigate()
	const fetcher = useFetcher<typeof loader>()
	const isPending =
		fetcher.state === 'submitting' || fetcher.state === 'loading'
	const delayedIsPending = useSpinDelay(isPending, {
		delay: 1000,
		minDuration: 300,
	})
	const [open, setOpen] = useState(false)
	const searchContainerRef = useRef<HTMLDivElement>(null)

	const results =
		fetcher.data?.results?.map((result) => ({
			id: result.id,
			result: result.result,
			model: result.model,
		})) || []

	// NOTE: Load the search results on initial render
	useEffect(() => {
		fetcher.submit(null, { method: 'GET', action: '/resources/search' })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleFormChange = useDebounce((search: string) => {
		fetcher.submit({ search }, { method: 'GET', action: '/resources/search' })
	}, 400)

	useEffect(() => {
		function handleClickInside(event: MouseEvent) {
			if (
				searchContainerRef.current &&
				searchContainerRef.current.contains(event.target as Node)
			) {
				setOpen(true)
			}
		}

		function handleSlash(event: KeyboardEvent) {
			if (event.key === '/') {
				event.preventDefault()
				setOpen(true)
			}
		}

		document.addEventListener('mousedown', handleClickInside)
		document.addEventListener('keydown', handleSlash)

		return () => {
			document.removeEventListener('mousedown', handleClickInside)
			document.removeEventListener('keydown', handleSlash)
		}
	}, [])

	return (
		<div className="relative flex-1" ref={searchContainerRef}>
			<Label className="sr-only">Search</Label>
			<Icon
				name="magnifying-glass"
				className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
			/>
			<Input
				placeholder="Press / to search"
				className="w-full appearance-none bg-background pl-8 shadow-none"
			/>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTitle className="hidden"></DialogTitle>
				<DialogContent className="overflow-hidden p-0 shadow-lg">
					<Command
						shouldFilter={false}
						className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
					>
						<CommandInput
							placeholder="Search..."
							onInput={(event) => {
								const inputElement = event.target as HTMLInputElement
								handleFormChange(inputElement.value)
							}}
							onFocus={(event) => {
								const inputElement = event.target as HTMLInputElement
								handleFormChange(inputElement.value)
							}}
						/>
						<CommandList>
							{delayedIsPending ? (
								<div className="flex w-full items-center justify-center py-6 text-sm">
									<Spinner
										showSpinner={true}
										className="text-muted-foreground"
									/>
								</div>
							) : results.length > 0 ? (
								<CommandGroup>
									{results.map((result, index) => (
										<CommandItem
											key={index}
											value={result.id}
											onSelect={(value) => {
												const modelToPath: { [key: string]: string } = {
													film: 'films',
													song: 'songs',
													person: 'people',
												}
												const modelPath = modelToPath[result.model] ?? 'films'

												navigate(`/dashboard/${modelPath}/${value}`)
												setOpen(false)
											}}
										>
											<span className="mr-1.5 mt-0.5">
												{result.model === 'film' ? (
													<Icon name="video" className="h-0 w-0" size="sm" />
												) : result.model === 'song' ? (
													<Icon
														name="audio-lines"
														className="h-1 w-1"
														size="sm"
													/>
												) : (
													<Icon name="user" className="h-1 w-1" size="sm" />
												)}
											</span>
											<span className="ml-1 text-muted-foreground">
												{result.result}
											</span>
										</CommandItem>
									))}
								</CommandGroup>
							) : (
								<CommandEmpty>No results found.</CommandEmpty>
							)}
						</CommandList>
					</Command>
				</DialogContent>
			</Dialog>
		</div>
	)
}
