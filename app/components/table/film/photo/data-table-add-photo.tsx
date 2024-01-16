import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import {
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
import {
	type AddFilmPhotoAction,
	AddFilmPhotoSchema,
} from '#app/routes/resources+/film+/add-photo.ts'
import { LANGUAGES, PHOTO_TYPES } from '#app/utils/constants.ts'

export function DataTableAddPhoto() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmPhotoAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-photo-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmPhotoSchema })
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
					Add Photo
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-photo"
					name="add-film-photo-form"
					encType="multipart/form-data"
					{...form.props}
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
								...conform.input(fields.image, { type: 'file' }),
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
								...conform.input(fields.type, { type: 'text' }),
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
								...conform.input(fields.language, { type: 'text' }),
							}}
							// TODO: This will need to be a connect query at some point, maybe?
							options={LANGUAGES.map(language => ({
								label: language.name,
								value: language.name,
							}))}
							errors={fields.language.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button variant="default" type="submit">
							Add Photo
						</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
