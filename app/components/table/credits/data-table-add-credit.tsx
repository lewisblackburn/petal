import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { ErrorList, Field, SearchSelectField } from '~/components/forms.tsx'
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
import { AddFilmCreditSchema } from '~/routes/resources+/film+/add-credit.ts'
import { PersonSearch } from '~/routes/resources+/people.tsx'
import { CREDIT_ROLES, getAllJobs } from '~/utils/constants.ts'
import { EnsurePE } from '~/utils/misc.tsx'

export function DataTableAddCredit() {
	const { filmId } = useParams()
	const fetcher = useFetcher()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-credit-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmCreditSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		if (fetcher.state === 'submitting') setOpen(false)
	}, [fetcher])

	return (
		// close dialog on form submission
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="ml-auto hidden h-8 lg:flex"
					onClick={() => setOpen(true)}
				>
					<Icon name="plus" className="mr-2 h-4 w-4" />
					Add Person
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-credit"
					name="add-film-credit-form"
					{...form.props}
				>
					<EnsurePE />
					<DialogHeader>
						<DialogTitle>Add Person</DialogTitle>
						<DialogDescription>
							Add a new person to the credits table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<PersonSearch
							labelProps={{
								htmlFor: fields.personId.id,
							}}
							inputProps={{
								...conform.input(fields.personId, { type: 'text' }),
							}}
							errors={fields.personId.errors}
						/>
						<Field
							labelProps={{
								htmlFor: fields.character.id,
								children: 'Character',
							}}
							inputProps={{
								...conform.input(fields.character, { type: 'text' }),
								autoComplete: 'off',
							}}
							errors={fields.character.errors}
						/>
						<SearchSelectField
							labelProps={{
								htmlFor: fields.department.id,
								children: 'Department',
							}}
							selectProps={{
								...conform.input(fields.department, { type: 'text' }),
							}}
							options={CREDIT_ROLES}
							errors={fields.department.errors}
						/>
						<SearchSelectField
							labelProps={{
								htmlFor: fields.job.id,
								children: 'Job',
							}}
							selectProps={{
								...conform.input(fields.job, { type: 'text' }),
							}}
							options={getAllJobs()}
							errors={fields.job.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button variant="default" type="submit">
							Add Person
						</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
