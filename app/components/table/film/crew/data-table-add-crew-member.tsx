import { getInputProps, getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
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
import { StatusButton } from '#app/components/ui/status-button'
import {
	type action as AddFilmCrewMemberAction,
	AddFilmCrewMemberSchema,
} from '#app/routes/resources+/film+/add-crew-member'
import { PersonSearch } from '#app/routes/resources+/people.tsx'
import { ROLES, getAllJobs } from '#app/utils/constants'

export function DataTableAddCrewMember() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmCrewMemberAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-crew-member-form',
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: AddFilmCrewMemberSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		if (form.status === 'success') {
			setOpen(false)
			form.reset()
		}
	}, [form])

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
					{...getFormProps(form)}
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
								...getInputProps(fields.personId, { type: 'text' }),
							}}
							errors={fields.personId.errors}
						/>
						<FilterSelectField
							labelProps={{
								htmlFor: fields.department.id,
								children: 'Department',
							}}
							buttonProps={{
								...getInputProps(fields.department, { type: 'text' }),
							}}
							options={ROLES.map(role => ({
								label: role.department,
								value: role.department,
							}))}
							errors={fields.department.errors}
						/>
						<FilterSelectField
							labelProps={{
								htmlFor: fields.job.id,
								children: 'Job',
							}}
							buttonProps={{
								...getInputProps(fields.job, { type: 'text' }),
							}}
							options={getAllJobs().map(job => ({ label: job, value: job }))}
							errors={fields.job.errors}
						/>
						<CheckboxField
							labelProps={{
								htmlFor: fields.featured.id,
								children: 'Featured',
							}}
							buttonProps={{
								...getInputProps(fields.featured, { type: 'checkbox' }),
							}}
							errors={fields.featured.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<StatusButton
							type="submit"
							variant="outline"
							status={
								fetcher.state !== 'idle' ? 'pending' : form.status ?? 'idle'
							}
							disabled={fetcher.state !== 'idle'}
							className="w-full max-md:aspect-square max-md:px-0"
						>
							<Icon name="plus" className="scale-125 max-md:scale-150">
								<span className="max-md:hidden">Add Photo</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
