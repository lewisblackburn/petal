import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { ErrorList, Field, SearchSelect } from '~/components/forms.tsx'
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
import { AddFilmCreditMemberSchema } from '~/routes/resources+/add-film-credit-member.tsx'
import { PersonSearch } from '~/routes/resources+/people.tsx'
import { CreditRoles, getAllJobs } from '~/utils/credit-roles.ts'

export function DataTableAddPerson() {
	const { filmId } = useParams()
	const fetcher = useFetcher()

	const [form, fields] = useForm({
		id: 'add-film-credit-member-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmCreditMemberSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="ml-auto hidden h-8 lg:flex"
				>
					<Icon name="plus" className="mr-2 h-4 w-4" />
					Add Person
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/add-film-credit-member"
					name="add-film-credit-member-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Add Person</DialogTitle>
						<DialogDescription>
							Add a new person to the credits table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<PersonSearch />
						<div className="min-h-[32px] px-4 pb-3 pt-1">
							<ErrorList
								errors={fields.personId.errors}
								id={fields.personId.id}
							/>
						</div>
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
						<SearchSelect
							inputProps={{
								...conform.input(fields.department, { type: 'text' }),
							}}
							errors={fields.department.errors}
							options={CreditRoles}
						/>
						<SearchSelect
							inputProps={{
								...conform.input(fields.job, { type: 'text' }),
							}}
							errors={fields.job.errors}
							options={getAllJobs()}
						/>
					</div>
					<DialogFooter>
						<Button type="submit">Add Person</Button>
					</DialogFooter>
					<ErrorList errors={form.errors} id={form.errorId} />
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
