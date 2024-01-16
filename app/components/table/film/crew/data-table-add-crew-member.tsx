import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import {
	CheckboxField,
	ErrorList,
	FilterSelectField,
} from '#app/components/forms.tsx'
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
	type AddFilmCrewMemberAction,
	AddFilmCrewMemberSchema,
} from '#app/routes/resources+/film+/add-crew-member'
import { PersonSearch } from '#app/routes/resources+/people.tsx'
import { CREW_ROLES, getAllJobs } from '#app/utils/constants'

export function DataTableAddCrewMember() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmCrewMemberAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-crew-member-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmCrewMemberSchema })
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
					Add Person
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-crew-member"
					name="add-film-crew-member-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Add Person</DialogTitle>
						<DialogDescription>
							Add a new crew member to the crew table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<PersonSearch
							labelProps={{
								htmlFor: fields.personId.id,
								children: 'Person',
							}}
							buttonProps={{
								...conform.input(fields.personId, { type: 'text' }),
							}}
							errors={fields.personId.errors}
						/>
						<FilterSelectField
							labelProps={{
								htmlFor: fields.department.id,
								children: 'Department',
							}}
							buttonProps={{
								...conform.input(fields.department, { type: 'text' }),
							}}
							options={CREW_ROLES}
							errors={fields.department.errors}
						/>
						<FilterSelectField
							labelProps={{
								htmlFor: fields.job.id,
								children: 'Job',
							}}
							buttonProps={{
								...conform.input(fields.job, { type: 'text' }),
							}}
							options={getAllJobs()}
							errors={fields.job.errors}
						/>
						<CheckboxField
							labelProps={{
								htmlFor: fields.featured.id,
								children: 'Featured',
							}}
							buttonProps={{
								...conform.input(fields.featured, { type: 'checkbox' }),
							}}
							errors={fields.featured.errors}
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
