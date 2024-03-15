import { getFormProps, useForm, getInputProps } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
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
import { StatusButton } from '#app/components/ui/status-button'
import {
	type action as EditFilmPhotoAction,
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
