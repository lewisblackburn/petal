import { type FilmTagline } from '@prisma/client'
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
import { type action as DeleteFilmTaglinesAction } from '#app/routes/resources+/film+/delete-taglines.ts'

interface DataTableDeleteTaglines<TData> {
	table: Table<TData>
}

export function DataTableDeleteTaglines<TData>({
	table,
}: DataTableDeleteTaglines<TData>) {
	const { filmId } = useParams()
	const taglinesSelected = table
		.getSelectedRowModel()
		.rows.map(row => (row.original as FilmTagline).id)
	const fetcher = useFetcher<typeof DeleteFilmTaglinesAction>()
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
				{taglinesSelected.length > 0 && (
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
				<fetcher.Form method="POST" action="/resources/film/delete-taglines">
					<DialogHeader>
						<DialogTitle>Delete Taglines</DialogTitle>
						<DialogDescription>
							Delete taglines from the taglines table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="taglineIds"
							type="hidden"
							value={JSON.stringify(taglinesSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
					</div>
					<DialogFooter>
						<StatusButton
							type="submit"
							name="intent"
							value="delete-film-taglines"
							variant="outline"
							status={
								fetcher.state !== 'idle'
									? 'pending'
									: fetcher.data?.result.status ?? 'idle'
							}
							disabled={fetcher.state !== 'idle'}
							className="w-full max-md:aspect-square max-md:px-0"
						>
							<Icon name="trash" className="scale-125 max-md:scale-150">
								<span className="max-md:hidden">Delete Taglines</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
