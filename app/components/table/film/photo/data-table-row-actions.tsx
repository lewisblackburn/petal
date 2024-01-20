import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { type Row } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import {
	CheckboxField,
	ErrorList,
	FilterSelectField,
	SelectField,
} from '#app/components/forms'
import { Button } from '#app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '#app/components/ui/dialog'
import { Icon } from '#app/components/ui/icon'
import {
	type EditFilmPhotoAction,
	EditFilmPhotoSchema,
} from '#app/routes/resources+/film+/edit-photo'
import { LANGUAGES, PHOTO_TYPES } from '#app/utils/constants'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const { filmId } = useParams()
	const photo = EditFilmPhotoSchema.omit({ image: true, filmId: true }).parse(
		row.original,
	)
	const fetcher = useFetcher<typeof EditFilmPhotoAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'edit-film-photo-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: EditFilmPhotoSchema })
		},
		shouldRevalidate: 'onBlur',
		defaultValue: {
			type: photo.type,
			language: photo.language,
		},
	})

	useEffect(() => {
		if (fetcher.data?.status !== 'error') setOpen(false)
	}, [fetcher])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="flex h-8 w-8 p-0">
					<Icon name="pencil-2" className="h-4 w-4" />
					<span className="sr-only">Edit Button</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/edit-photo"
					name="edit-film-photo-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Edit Photo Details</DialogTitle>
						<DialogDescription>Edit photo details.</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="id" type="hidden" value={photo.id} />
						<input name="filmId" type="hidden" value={filmId} />
						<input name="url" type="hidden" value={photo.url} />
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
							buttonProps={conform.input(fields.primary, { type: 'checkbox' })}
							errors={fields.primary.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button variant="default" type="submit">
							Edit Photo
						</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
