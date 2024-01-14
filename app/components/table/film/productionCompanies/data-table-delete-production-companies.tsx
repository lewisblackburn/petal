import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { type FilmAlternateTitle } from '@prisma/client'
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
import { DeleteFilmProductionCompaniesAction, DeleteFilmProductionCompaniesSchema } from '#app/routes/resources+/film+/delete-production-companies.ts'

interface DataTableDeleteProductionCompanies<TData> {
	table: Table<TData>
}

export function DataTableDeleteProductionCompanies<TData>({
	table,
}: DataTableDeleteProductionCompanies<TData>) {
	const { filmId } = useParams()
	const productionCompaniesSelected = table
		.getSelectedRowModel()
		.rows.map(row => (row.original as FilmAlternateTitle).id)
	const fetcher = useFetcher<typeof DeleteFilmProductionCompaniesAction>()
	const [open, setOpen] = useState(false)

	const [form] = useForm({
		id: 'delete-film-prodction-companies-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: DeleteFilmProductionCompaniesSchema })
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
				{productionCompaniesSelected.length > 0 && (
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
					action="/resources/film/delete-production-companies"
					name="delete-film-production-companies-form"
					{...form.props}
					onSubmit={() => {
						setOpen(false)
					}}
				>
					<DialogHeader>
						<DialogTitle>Delete Production Companies</DialogTitle>
						<DialogDescription>
							Delete produciton companies from the production companies table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input
							name="ids"
							type="hidden"
							value={JSON.stringify(productionCompaniesSelected)}
						/>
						<input name="filmId" type="hidden" value={filmId} />
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button type="submit">Delete Production Companies</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
