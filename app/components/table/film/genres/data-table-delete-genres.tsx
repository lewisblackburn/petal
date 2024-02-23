import { type Genre } from '@prisma/client'
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
import { type action as DeleteFilmGenresAction } from '#app/routes/resources+/film+/delete-genres.ts'

interface DataTableDeleteGenres<TData> {
	table: Table<TData>
}

export function DataTableDeleteGenres<TData>({
	table,
}: DataTableDeleteGenres<TData>) {
	const { filmId } = useParams()
	const genresSelected = table
		.getSelectedRowModel()
		.rows.map(row => (row.original as Genre).id)
	const fetcher = useFetcher<typeof DeleteFilmGenresAction>()
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (fetcher.state === 'idle') {
			table.setRowSelection({})
		}
		fetcher.data?.status === 'success' && setOpen(false)
	}, [fetcher, table])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{genresSelected.length > 0 && (
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
					action="/resources/film/delete-genres"
					onSubmit={() => {
						setOpen(false)
					}}
				>
					<DialogHeader>
						<DialogTitle>Delete Genres</DialogTitle>
						<DialogDescription>
							Delete genres from the genres table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="genreIds"
							type="hidden"
							value={JSON.stringify(genresSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
					</div>
					<DialogFooter>
						<StatusButton
							type="submit"
							variant="outline"
							name="intent"
							value="delete-film-genres"
							status={
								fetcher.state !== 'idle'
									? 'pending'
									: fetcher.data?.status ?? 'idle'
							}
							disabled={fetcher.state !== 'idle'}
							className="w-full max-md:aspect-square max-md:px-0"
						>
							<Icon name="trash" className="scale-125 max-md:scale-150">
								<span className="max-md:hidden">Delete Genres</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
