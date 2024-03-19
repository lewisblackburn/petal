import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
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
	type action as AddFilmPhotoAction,
	AddFilmPhotoSchema,
} from '#app/routes/resources+/film+/add-photo.ts'
import { PHOTO_TYPES } from '#app/utils/constants.ts'
import { InputConform } from '../../../form/conform/Input'

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
						<Field>
							<Label htmlFor={fields.image.id}>Image</Label>
							{/* @ts-expect-error image is not a valid prop for InputConform */}
							<InputConform meta={fields.image} type="file" accept="image/*" />
							{fields.image.errors && (
								<FieldError>{fields.image.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.type.id}>Type</Label>
							<SelectConform
								placeholder="Select a photo type"
								meta={fields.type}
								items={PHOTO_TYPES.map(photoType => ({
									name: photoType.label,
									value: photoType.value,
								}))}
							/>
							{fields.type.errors && (
								<FieldError>{fields.type.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.language.id}>Language</Label>
							<LanguagePickerConform meta={fields.language} />
							{fields.language.errors && (
								<FieldError>{fields.language.errors}</FieldError>
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
