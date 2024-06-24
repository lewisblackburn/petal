import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { CountryPickerConform } from '#app/components/form/conform/CountryPicker.js'
import { DatePickerConform } from '#app/components/form/conform/DatePicker.js'
import { InputConform } from '#app/components/form/conform/Input.js'
import { LanguagePickerConform } from '#app/components/form/conform/LanguagePicker.js'
import { SelectConform } from '#app/components/form/conform/Select.js'
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
	type action as AddFilmReleaseInformationAction,
	AddFilmReleaseInformationSchema,
} from '#app/routes/resources+/film+/add-release-information.ts'
import { FILM_RELEASE_TYPES } from '#app/utils/constants.ts'

export function DataTableAddReleaseInformation() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmReleaseInformationAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-release-information-form',
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: AddFilmReleaseInformationSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		form.status === 'success' && setOpen(false)
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
					Add Release Information
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-release-information"
					name="add-film-release-information-form"
					{...getFormProps(form)}
				>
					<DialogHeader>
						<DialogTitle>Add Release Information</DialogTitle>
						<DialogDescription>
							Add a new release information to the release release information
							table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<Field>
							<Label htmlFor={fields.country.id}>Country</Label>
							<CountryPickerConform meta={fields.country} />
							{fields.country.errors && (
								<FieldError>{fields.country.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.language.id}>Language</Label>
							<LanguagePickerConform meta={fields.language} />
							{fields.language.errors && (
								<FieldError>{fields.language.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.date.id}>Date</Label>
							<DatePickerConform meta={fields.date} />
							{fields.date.errors && (
								<FieldError>{fields.date.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.classification.id}>Classification</Label>
							<InputConform meta={fields.classification} type="text" />
							{fields.classification.errors && (
								<FieldError>{fields.classification.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.type.id}>Type</Label>
							<SelectConform
								placeholder="Select a type"
								meta={fields.type}
								items={FILM_RELEASE_TYPES.map((releaseType) => ({
									name: releaseType.label,
									value: releaseType.value,
								}))}
							/>
							{fields.type.errors && (
								<FieldError>{fields.type.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.note.id}>Note</Label>
							<InputConform meta={fields.note} type="text" />
							{fields.note.errors && (
								<FieldError>{fields.note.errors}</FieldError>
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
								<span className="max-md:hidden">Add Release Information</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
