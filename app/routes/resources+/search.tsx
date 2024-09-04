import { type LoaderFunctionArgs } from '@remix-run/node'
import { json, useFetcher, useSearchParams } from '@remix-run/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useId } from 'react'
import { z } from 'zod'
import { CardContent } from '#app/components/ui/card.js'
import { prisma } from '#app/utils/db.server.js'
import { useDebounce } from '#app/utils/misc.js'
import { Spinner } from '../../components/spinner'
import { Icon } from '../../components/ui/icon'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

const SearchResultSchema = z.array(
	z.object({
		result: z.string(),
		model: z.string(),
	}),
)

export async function loader({ request }: LoaderFunctionArgs) {
	const searchTerm = new URL(request.url).searchParams.get('search')
	const like = `%${searchTerm ?? ''}%`

	const rawResults = await prisma.$queryRaw`
        SELECT title AS "result", 'Film' AS "model" FROM Film WHERE title LIKE ${like}
        UNION
        SELECT title AS "result", 'Song' AS "model" FROM Song WHERE title LIKE ${like}
        UNION
        SELECT name AS "result", 'Person' AS "model" FROM Person WHERE name LIKE ${like}
        LIMIT 10;
    `

	const result = SearchResultSchema.safeParse(rawResults)

	return json({ results: result.data })
}

export default function Search() {
	const fetcher = useFetcher<typeof loader>()
	const id = useId()
	const [searchParams] = useSearchParams()
	const isPending =
		fetcher.state === 'submitting' || fetcher.state === 'loading'
	const [isVisible, setIsVisible] = useState(false)
	const searchContainerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleFormChange = useDebounce((search: string) => {
		if (search) {
			setIsVisible(true)
			fetcher.submit({ search }, { method: 'GET', action: '/resources/search' })
		} else {
			setIsVisible(false)
		}
	}, 300)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				searchContainerRef.current &&
				!searchContainerRef.current.contains(event.target as Node)
			) {
				setIsVisible(false)
			}
		}

		function handleClickInside(event: MouseEvent) {
			if (
				searchContainerRef.current &&
				searchContainerRef.current.contains(event.target as Node)
			) {
				setIsVisible(true)
			}
		}

		function handleSlash(event: KeyboardEvent) {
			if (event.key === '/') {
				event.preventDefault()
				setIsVisible(true)
				inputRef.current?.focus()
			}
		}

		function handleEscape(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setIsVisible(false)
				inputRef.current?.blur()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('mousedown', handleClickInside)
		document.addEventListener('keydown', handleSlash)
		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [])

	return (
		<div className="relative flex-1" ref={searchContainerRef}>
			<Label htmlFor={id} className="sr-only">
				Search
			</Label>
			{isPending ? (
				<Spinner
					showSpinner={true}
					className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
				/>
			) : (
				<Icon
					name="magnifying-glass"
					className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
				/>
			)}
			<Input
				type="search"
				name="search"
				id={id}
				ref={inputRef}
				defaultValue={searchParams.get('search') ?? ''}
				onChange={(e) => handleFormChange(e.currentTarget.value)}
				placeholder="Press / to search"
				className="w-full appearance-none bg-background pl-8 shadow-none"
				autoComplete="off"
				autoCorrect="off"
			/>
			<AnimatePresence>
				{isVisible && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.1 }}
						className="group absolute z-50 mt-2 w-full cursor-pointer rounded-lg border bg-secondary"
					>
						<CardContent className="flex flex-col p-0">
							{fetcher.data?.results?.map((result, index) => (
								<div key={index} className="border-b p-4 hover:bg-card">
									<span className="text-sm text-muted-foreground">
										{result.model}
									</span>
									<p className="text-lg">{result.result}</p>
								</div>
							))}
						</CardContent>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
