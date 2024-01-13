import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { type FilmReleaseInformation } from '@prisma/client'
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
import { DeleteFilmReleaseInformationSchema } from '#app/routes/resources+/film+/delete-release-information.ts'

interface DataTableDeleteReleaseInformation<TData> {
	table: Table<TData>
}

export function DataTableDeleteReleaseInformation<TData>({
	table,
}: DataTableDeleteReleaseInformation<TData>) {
	const { filmId } = useParams()
	const releaseInformationSelected = table
		.getSelectedRowModel()
		.rows.map(row => (row.original as FilmReleaseInformation).id)
	const fetcher = useFetcher()
	const [open, setOpen] = useState(false)

	const [form] = useForm({
		id: 'delete-film-release-information-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: DeleteFilmReleaseInformationSchema })
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
				{releaseInformationSelected.length > 0 && (
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
					action="/resources/film/delete-release-information"
					name="delete-film-release-information-form"
					{...form.props}
					onSubmit={() => {
						setOpen(false)
					}}
				>
					<DialogHeader>
						<DialogTitle>Delete Release Information</DialogTitle>
						<DialogDescription>
							Delete release information from the release information table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="ids"
							type="hidden"
							value={JSON.stringify(releaseInformationSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button type="submit">Delete Release Information</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
