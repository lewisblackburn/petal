import { type FilmAlternateTitle } from '@prisma/client'
import { useFetcher, useParams } from '@remix-run/react'
import { type Table } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Button } from '#app/components/ui/button.tsx'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '#app/components/ui/dialog.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { StatusButton } from '#app/components/ui/status-button'
import { type action as DeleteFilmAlternativeTitlesAction } from '#app/routes/resources+/film+/delete-alternative-titles.ts'

interface DataTableDeleteAlternativeTitles<TData> {
	table: Table<TData>
}

export function DataTableDeleteAlternativeTitles<TData>({
	table,
}: DataTableDeleteAlternativeTitles<TData>) {
	const { filmId } = useParams()
	const alternativeTitlesSelected = table
		.getSelectedRowModel()
		.rows.map((row) => (row.original as FilmAlternateTitle).id)
	const fetcher = useFetcher<typeof DeleteFilmAlternativeTitlesAction>()
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (fetcher.state === 'idle') {
			table.setRowSelection({})
		}
		fetcher.data?.result.status === 'success' && setOpen(false)
	}, [fetcher, table])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{alternativeTitlesSelected.length > 0 && (
					<Button
						variant="destructive"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
					>
						<Icon name="plus" className="mr-2 h-4 w-4" />
						Delete
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/delete-alternative-titles"
				>
					<DialogHeader>
						<DialogTitle>Delete Alternative Titles</DialogTitle>
						<DialogDescription>
							Delete alternative titles from the alternative titles table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="alternativeTitleIds"
							type="hidden"
							value={JSON.stringify(alternativeTitlesSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
					</div>
					<DialogFooter>
						<StatusButton
							type="submit"
							name="intent"
							value="delete-film-alternative-titles"
							variant="outline"
							status={
								fetcher.state !== 'idle'
									? 'pending'
									: fetcher.data?.result.status ?? 'idle'
							}
							disabled={fetcher.state !== 'idle'}
							className="w-full max-md:aspect-square max-md:px-0"
						>
							Delete Alternative Titles
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
