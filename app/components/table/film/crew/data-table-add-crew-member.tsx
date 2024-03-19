import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useState, useEffect } from 'react'
import { CheckboxConform } from '#app/components/form/conform/Checkbox.js'
import { DepartmentPickerConform } from '#app/components/form/conform/DepartmentPicker.js'
import { JobPickerConform } from '#app/components/form/conform/JobPicker.js'
import { Field, FieldError } from '#app/components/form/Field.js'
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
import { Label } from '#app/components/ui/label.js'
import { StatusButton } from '#app/components/ui/status-button'
import {
	type action as AddFilmCrewMemberAction,
	AddFilmCrewMemberSchema,
} from '#app/routes/resources+/film+/add-crew-member'
import { PersonSearchConform } from '#app/routes/resources+/people.tsx'

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
						<Field>
							<Label htmlFor={fields.personId.id}>Person</Label>
							<PersonSearchConform fields={fields.personId} />
							{fields.personId.errors && (
								<FieldError>{fields.personId.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.department.id}>Department</Label>
							<DepartmentPickerConform meta={fields.department} />
							{fields.department.errors && (
								<FieldError>{fields.department.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.job.id}>Job</Label>
							<JobPickerConform meta={fields.job} />
							{fields.job.errors && (
								<FieldError>{fields.job.errors}</FieldError>
							)}
						</Field>
						<Field>
							<div className="flex items-center gap-2">
								<CheckboxConform meta={fields.featured} />
								<Label htmlFor={fields.featured.id}>Featured</Label>
							</div>
							{fields.featured.errors && (
								<FieldError>{fields.featured.errors}</FieldError>
							)}
						</Field>
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
