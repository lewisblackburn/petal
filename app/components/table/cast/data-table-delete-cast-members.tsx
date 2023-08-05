import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { type CastMember } from '@prisma/client'
import { useFetcher, useParams } from '@remix-run/react'
import { type Table } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { ErrorList } from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog.tsx'
import { Icon } from '~/components/ui/icon.tsx'
import { DeleteFilmCastMembersSchema } from '~/routes/resources+/film+/delete-cast-members.ts'
import { EnsurePE } from '~/utils/misc.tsx'

interface DataTableDeleteCastMembers<TData> {
	table: Table<TData>
}

export function DataTableDeleteCastMembers<TData>({
	table,
}: DataTableDeleteCastMembers<TData>) {
	const { filmId } = useParams()
	const peopleSelected = table
		.getSelectedRowModel()
		.rows.map(row => (row.original as CastMember).id)
	const fetcher = useFetcher()
	const [open, setOpen] = useState(false)

	const [form] = useForm({
		id: 'delete-film-cast-members-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: DeleteFilmCastMembersSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		if (fetcher.state === 'idle') {
			table.setRowSelection({})
		}
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
					action="/resources/film/delete-cast-members"
					name="delete-film-cast-members-form"
					{...form.props}
					onSubmit={() => {
						setOpen(false)
					}}
				>
					<EnsurePE />
					<DialogHeader>
						<DialogTitle>Delete Cast Member</DialogTitle>
						<DialogDescription>
							Delete cast members from the cast table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="ids"
							type="hidden"
							value={JSON.stringify(peopleSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button type="submit">Delete Cast Member</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
