import { getInputProps, getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { ErrorList, Field, FilterSelectField } from '#app/components/forms.tsx'
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
	type AddFilmVideoAction,
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
						<Field
							labelProps={{
								htmlFor: fields.url.id,
								children: 'URL',
							}}
							inputProps={{
								...getInputProps(fields.url, { type: 'text' }),
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
								...getInputProps(fields.name, { type: 'text' }),
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
								...getInputProps(fields.site, { type: 'text' }),
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
								...getInputProps(fields.type, { type: 'text' }),
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
								...getInputProps(fields.quality, { type: 'text' }),
							}}
							options={QUALITY}
							errors={fields.quality.errors}
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
								<span className="max-md:hidden">Add Video</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
