import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { type PersonImage } from '@prisma/client'
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
	DeletePersonImagesSchema,
	type DeletePersonPhotosAction,
} from '#app/routes/resources+/person+/delete-photos.ts'

interface DataTableDeletePhotos<TData> {
	table: Table<TData>
}

export function DataTableDeletePhotos<TData>({
	table,
}: DataTableDeletePhotos<TData>) {
	const { personId } = useParams()
	const photosSelected = table
		.getSelectedRowModel()
		.rows.map(row => (row.original as PersonImage).id)
	const fetcher = useFetcher<typeof DeletePersonPhotosAction>()
	const [open, setOpen] = useState(false)

	const [form] = useForm({
		id: 'delete-person-photos-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: DeletePersonImagesSchema })
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
					action="/resources/person/delete-photos"
					name="delete-person-photos-form"
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
						<input name="personId" type="hidden" value={personId} />
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
