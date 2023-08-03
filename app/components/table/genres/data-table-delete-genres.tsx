import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { type Genre } from '@prisma/client'
import { useFetcher, useParams } from '@remix-run/react'
import { type Table } from '@tanstack/react-table'
import { useEffect } from 'react'
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
import { DeleteFilmGenresSchema } from '~/routes/resources+/film+/delete-genres.ts'
import { EnsurePE } from '~/utils/misc.tsx'

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
	const fetcher = useFetcher()

	const [form] = useForm({
		id: 'delete-film-genres-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: DeleteFilmGenresSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		if (fetcher.state === 'idle') {
			table.setRowSelection({})
		}
	}, [fetcher, table])

	return (
		<Dialog>
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
					name="delete-film-genres-form"
					{...form.props}
				>
					<EnsurePE />
					<DialogHeader>
						<DialogTitle>Delete Genres</DialogTitle>
						<DialogDescription>
							Delete genres from the genres table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="ids"
							type="hidden"
							value={JSON.stringify(genresSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button type="submit">Delete Genres</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
