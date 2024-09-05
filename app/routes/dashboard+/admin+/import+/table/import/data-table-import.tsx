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
import { type action as ImportTMDBFilmsAction } from '#app/routes/dashboard+/admin+/import+/index.tsx'
import { type TMDBFilm } from '#app/types/tmdb.js'

interface DataTableImportTMDBFilms<TData> {
	table: Table<TData>
}

export function DataTableImport<TData>({
	table,
}: DataTableImportTMDBFilms<TData>) {
	const { filmId } = useParams()
	const tmdbFilmsSelected = table
		.getSelectedRowModel()
		.rows.map((row) => (row.original as TMDBFilm).id)
	const fetcher = useFetcher<typeof ImportTMDBFilmsAction>()

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
				{tmdbFilmsSelected.length > 0 && (
					<Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
					>
						<Icon name="plus" className="mr-2 h-4 w-4" />
						Import
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form method="POST" action="/dashboard/admin/import">
					<DialogHeader>
						<DialogTitle>Import Films</DialogTitle>
						<DialogDescription>Import films from TMDB.</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="tmdbIds"
							type="hidden"
							value={JSON.stringify(tmdbFilmsSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
					</div>
					<DialogFooter>
						<StatusButton
							type="submit"
							variant="outline"
							name="intent"
							status={
								fetcher.state !== 'idle'
									? 'pending'
									: (fetcher.data?.result.status ?? 'idle')
							}
							disabled={fetcher.state !== 'idle'}
							className="w-full max-md:aspect-square max-md:px-0"
						>
							<Icon name="trash" className="scale-125 max-md:scale-150">
								<span className="max-md:hidden">Import Films</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
