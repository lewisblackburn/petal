import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { type Keyword } from '@prisma/client'
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
import { DeleteFilmKeywordsSchema } from '~/routes/resources+/film+/delete-keywords.ts'
import { EnsurePE } from '~/utils/misc.tsx'

interface DataTableDeleteKeywords<TData> {
	table: Table<TData>
}

export function DataTableDeleteKeywords<TData>({
	table,
}: DataTableDeleteKeywords<TData>) {
	const { filmId } = useParams()
	const keywordsSelected = table
		.getSelectedRowModel()
		.rows.map(row => (row.original as Keyword).id)
	const fetcher = useFetcher()
	const [open, setOpen] = useState(false)

	const [form] = useForm({
		id: 'delete-film-keywords-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: DeleteFilmKeywordsSchema })
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
				{keywordsSelected.length > 0 && (
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
					action="/resources/film/delete-keywords"
					name="delete-film-keywords-form"
					{...form.props}
					onSubmit={() => {
						setOpen(false)
					}}
				>
					<EnsurePE />
					<DialogHeader>
						<DialogTitle>Delete Keywords</DialogTitle>
						<DialogDescription>
							Delete keywords from the keywords table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="ids"
							type="hidden"
							value={JSON.stringify(keywordsSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button type="submit">Delete Keywords</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
