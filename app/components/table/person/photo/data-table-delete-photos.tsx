import { type PersonImage } from '@prisma/client'
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
import { type action as DeletePersonPhotosAction } from '#app/routes/resources+/person+/delete-photos.ts'

interface DataTableDeletePhotos<TData> {
	table: Table<TData>
}

export function DataTableDeletePhotos<TData>({
	table,
}: DataTableDeletePhotos<TData>) {
	const { personId } = useParams()
	const photosSelected = table
		.getSelectedRowModel()
		.rows.map((row) => (row.original as PersonImage).id)
	const fetcher = useFetcher<typeof DeletePersonPhotosAction>()
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
				{photosSelected.length > 0 && (
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
				<fetcher.Form method="POST" action="/resources/person/delete-photos">
					<DialogHeader>
						<DialogTitle>Delete Photos</DialogTitle>
						<DialogDescription>
							Delete photos from the photos table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="peopleIds"
							type="hidden"
							value={JSON.stringify(photosSelected)}
						/>
						<input name="personId" type="hidden" value={personId} />
					</div>
					<DialogFooter>
						<StatusButton
							type="submit"
							name="intent"
							value="delete-person-photos"
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
								<span className="max-md:hidden">Delete Photos</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
