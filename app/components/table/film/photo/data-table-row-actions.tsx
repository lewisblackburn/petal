import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { type Row } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { CheckboxConform } from '#app/components/form/conform/Checkbox.js'
import { LanguagePickerConform } from '#app/components/form/conform/LanguagePicker.js'
import { SelectConform } from '#app/components/form/conform/Select.js'
import { Field, FieldError } from '#app/components/form/Field.js'
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
import { Label } from '#app/components/ui/label.js'
import { StatusButton } from '#app/components/ui/status-button'
import {
	type action as EditFilmPhotoAction,
	EditFilmPhotoSchema,
} from '#app/routes/resources+/film+/edit-photo'
import { PHOTO_TYPES } from '#app/utils/constants'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const { filmId } = useParams()
	const photo = EditFilmPhotoSchema.omit({ filmId: true }).parse(row.original)
	const fetcher = useFetcher<typeof EditFilmPhotoAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'edit-film-photo-form',
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: EditFilmPhotoSchema })
		},
		shouldRevalidate: 'onBlur',
		defaultValue: {
			type: photo.type,
			language: photo.language,
			primary: photo.primary ? 'on' : 'off',
		},
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
					{...getFormProps(form)}
				>
					<DialogHeader>
						<DialogTitle>Edit Photo Details</DialogTitle>
						<DialogDescription>Edit photo details.</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="id" type="hidden" value={photo.id} />
						<input name="filmId" type="hidden" value={filmId} />
						<input name="url" type="hidden" value={photo.url} />
						<Field>
							<Label htmlFor={fields.type.id}>Type</Label>
							<SelectConform
								placeholder="Select a type"
								meta={fields.type}
								items={PHOTO_TYPES.map((type) => ({
									name: type.label,
									value: type.value,
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
						<Field>
							<div className="flex items-center gap-2">
								<CheckboxConform meta={fields.primary} />
								<Label htmlFor={fields.primary.id}>Primary</Label>
							</div>
							{fields.primary.errors && (
								<FieldError>{fields.primary.errors}</FieldError>
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
							<Icon name="pencil-1" className="scale-125 max-md:scale-150">
								<span className="max-md:hidden">Edit Photo</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
