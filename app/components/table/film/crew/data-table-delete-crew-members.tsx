import { type FilmCrewMember } from '@prisma/client'
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
import { type DeleteFilmCrewMembersAction } from '#app/routes/resources+/film+/delete-crew-members.ts'

interface DataTableDeleteCrewMembers<TData> {
	table: Table<TData>
}

export function DataTableDeleteCrewMembers<TData>({
	table,
}: DataTableDeleteCrewMembers<TData>) {
	const { filmId } = useParams()
	const peopleSelected = table
		.getSelectedRowModel()
		.rows.map(row => (row.original as FilmCrewMember).id)
	const fetcher = useFetcher<typeof DeleteFilmCrewMembersAction>()
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
				{peopleSelected.length > 0 && (
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
					action="/resources/film/delete-crew-members"
				>
					<DialogHeader>
						<DialogTitle>Delete Crew Member</DialogTitle>
						<DialogDescription>
							Delete crew members from the crew table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="crewMemberIds"
							type="hidden"
							value={JSON.stringify(peopleSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
					</div>
					<DialogFooter>
						<StatusButton
							type="submit"
							name="intent"
							value="delete-film-crew-members"
							variant="outline"
							status={
								fetcher.state !== 'idle'
									? 'pending'
									: fetcher.data?.status ?? 'idle'
							}
							disabled={fetcher.state !== 'idle'}
							className="w-full max-md:aspect-square max-md:px-0"
						>
							<Icon name="trash" className="scale-125 max-md:scale-150">
								<span className="max-md:hidden">Delete Crew Members</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
