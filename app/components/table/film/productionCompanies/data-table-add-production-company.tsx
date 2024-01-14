import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
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
import { AddFilmProductionCompanyAction, AddFilmProductionCompanySchema } from '#app/routes/resources+/film+/add-production-company.ts'
import { ProductionCompanySearch } from '#app/routes/resources+/productionCompanies.tsx'

export function DataTableAddProductionCompany() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmProductionCompanyAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-production-company-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmProductionCompanySchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		if (fetcher.data?.status !== 'error') setOpen(false)
	}, [fetcher])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="ml-auto hidden h-8 lg:flex"
				>
					<Icon name="plus" className="mr-2 h-4 w-4" />
					Add Production Company
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-production-company"
					name="add-film-production-company-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Add Production Company</DialogTitle>
						<DialogDescription>
							Add a new production company to the production companies table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<ProductionCompanySearch
							labelProps={{
								htmlFor: fields.companyId.id,
								children: 'Company',
								autoFocus: true,
							}}
							buttonProps={{
								...conform.input(fields.companyId, { type: 'text' }),
							}}
							errors={fields.companyId.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button variant="default" type="submit">
							Add Production Company
						</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
