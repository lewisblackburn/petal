import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { type FilmPhoto } from '@prisma/client'
import { useFetcher, useParams } from '@remix-run/react'
import { type Table } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { ErrorList } from '#app/components/forms.tsx'
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
import {
	type DeleteFilmPhotosAction,
	DeleteFilmPhotosSchema,
} from '#app/routes/resources+/film+/delete-photos.ts'

interface DataTableDeletePhotos<TData> {
	table: Table<TData>
}

export function DataTableDeletePhotos<TData>({
	table,
}: DataTableDeletePhotos<TData>) {
	const { filmId } = useParams()
	const photosSelected = table
		.getSelectedRowModel()
		.rows.map(row => (row.original as FilmPhoto).id)
	const fetcher = useFetcher<typeof DeleteFilmPhotosAction>()
	const [open, setOpen] = useState(false)

	const [form] = useForm({
		id: 'delete-film-photos-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: DeleteFilmPhotosSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		if (fetcher.state === 'idle') {
			table.setRowSelection({})
		}
		if (fetcher.data?.status !== 'error') setOpen(false)
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
				<fetcher.Form
					method="POST"
					action="/resources/film/delete-photos"
					name="delete-film-photos-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Delete Photos</DialogTitle>
						<DialogDescription>
							Delete photos from the photos table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="ids"
							type="hidden"
							value={JSON.stringify(photosSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button type="submit">Delete Photos</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
