import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { InputConform } from '#app/components/form/conform/Input.js'
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
	type action as AddFilmVideoAction,
	AddFilmVideoSchema,
} from '#app/routes/resources+/film+/add-video.ts'
import { VIDEO_TYPES, QUALITY, SITES } from '#app/utils/constants.ts'

export function DataTableAddVideo() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmVideoAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-video-form',
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: AddFilmVideoSchema })
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
					Add Video
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-video"
					name="add-film-video-form"
					{...getFormProps(form)}
				>
					<DialogHeader>
						<DialogTitle>Add Video</DialogTitle>
						<DialogDescription>
							Add a new video to the videos table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<Field>
							<Label htmlFor={fields.url.id}>URL</Label>
							<InputConform meta={fields.url} type="text" />
							{fields.url.errors && (
								<FieldError>{fields.url.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.name.id}>Name</Label>
							<InputConform meta={fields.name} type="text" />
							{fields.name.errors && (
								<FieldError>{fields.name.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.site.id}>Site</Label>
							<SelectConform
								placeholder="Select a site"
								meta={fields.site}
								items={SITES.map((site) => ({
									name: site.label,
									value: site.value,
								}))}
							/>
							{fields.site.errors && (
								<FieldError>{fields.site.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.type.id}>Type</Label>
							<SelectConform
								placeholder="Select a type"
								meta={fields.type}
								items={VIDEO_TYPES.map((type) => ({
									name: type.label,
									value: type.value,
								}))}
							/>
							{fields.type.errors && (
								<FieldError>{fields.type.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.quality.id}>Quality</Label>
							<SelectConform
								placeholder="Select quality"
								meta={fields.quality}
								items={QUALITY.map((quality) => ({
									name: quality.label,
									value: quality.value,
								}))}
							/>
							{fields.quality.errors && (
								<FieldError>{fields.quality.errors}</FieldError>
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
								<span className="max-md:hidden">Add Video</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
