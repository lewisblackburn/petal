import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import {
	CheckboxField,
	ErrorList,
	Field,
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
import { AddFilmVideoSchema } from '#app/routes/resources+/film+/add-video.ts'
import { VIDEO_TYPES, QUALITY, SITES } from '#app/utils/constants.ts'

export function DataTableAddVideo() {
	const { filmId } = useParams()
	const fetcher = useFetcher()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-video-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmVideoSchema })
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
					Add Video
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-video"
					name="add-film-video-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Add Video</DialogTitle>
						<DialogDescription>
							Add a new video to the videos table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<Field
							labelProps={{
								htmlFor: fields.url.id,
								children: 'URL',
							}}
							inputProps={{
								...conform.input(fields.url, { type: 'text' }),
								autoComplete: 'off',
							}}
							errors={fields.url.errors}
						/>
						<Field
							labelProps={{
								htmlFor: fields.name.id,
								children: 'Name',
							}}
							inputProps={{
								...conform.input(fields.name, { type: 'text' }),
								autoComplete: 'off',
							}}
							errors={fields.name.errors}
						/>
						<FilterSelectField
							labelProps={{
								htmlFor: fields.site.id,
								children: 'Site',
							}}
							buttonProps={{
								...conform.input(fields.site, { type: 'text' }),
							}}
							options={SITES}
							errors={fields.site.errors}
						/>
						<FilterSelectField
							labelProps={{
								htmlFor: fields.type.id,
								children: 'Type',
							}}
							buttonProps={{
								...conform.input(fields.type, { type: 'text' }),
							}}
							options={VIDEO_TYPES}
							errors={fields.type.errors}
						/>
						<FilterSelectField
							labelProps={{
								htmlFor: fields.quality.id,
								children: 'Quality',
							}}
							buttonProps={{
								...conform.input(fields.quality, { type: 'text' }),
							}}
							options={QUALITY}
							errors={fields.quality.errors}
						/>
						<CheckboxField
							labelProps={{
								htmlFor: fields.primary.id,
								children: 'Primary',
							}}
							buttonProps={conform.input(fields.primary, {
								type: 'checkbox',
							})}
							errors={fields.primary.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button variant="default" type="submit">
							Add Video
						</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
