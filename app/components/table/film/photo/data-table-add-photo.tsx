import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import {
	CheckboxField,
	ErrorList,
	Field,
	FilterSelectField,
	SelectField,
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
	type action as AddFilmPhotoAction,
	AddFilmPhotoSchema,
} from '#app/routes/resources+/film+/add-photo.ts'
import { LANGUAGES, PHOTO_TYPES } from '#app/utils/constants.ts'

export function DataTableAddPhoto() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmPhotoAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-photo-form',
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: AddFilmPhotoSchema })
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
					Add Photo
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-photo"
					name="add-film-photo-form"
					encType="multipart/form-data"
					{...getFormProps(form)}
				>
					<DialogHeader>
						<DialogTitle>Add Photo</DialogTitle>
						<DialogDescription>
							Add a new photo to the photos table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<Field
							labelProps={{
								htmlFor: fields.image.id,
								children: 'Image',
							}}
							inputProps={{
								...getInputProps(fields.image, { type: 'file' }),
								accept: 'image/*',
							}}
							errors={fields.image.errors}
						/>
						<SelectField
							labelProps={{
								htmlFor: fields.type.id,
								children: 'Type',
							}}
							buttonProps={{
								...getInputProps(fields.type, { type: 'text' }),
							}}
							options={PHOTO_TYPES}
							errors={fields.type.errors}
						/>
						<FilterSelectField
							labelProps={{
								htmlFor: fields.language.id,
								children: 'Language',
							}}
							buttonProps={{
								...getInputProps(fields.language, { type: 'text' }),
							}}
							options={LANGUAGES.map(language => ({
								label: language.name,
								value: language.name,
							}))}
							errors={fields.language.errors}
						/>
						<CheckboxField
							labelProps={{
								htmlFor: fields.primary.id,
								children: 'Primary',
							}}
							buttonProps={getInputProps(fields.primary, { type: 'checkbox' })}
							errors={fields.primary.errors}
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
