import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import {
	CheckboxField,
	ErrorList,
	Field,
	SearchSelectField,
} from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog.tsx'
import { Icon } from '~/components/ui/icon.tsx'
import { AddFilmVideoSchema } from '~/routes/resources+/film+/add-video.ts'
import { VIDEO_TYPES, QUALITY, SITES } from '~/utils/constants.ts'
import { EnsurePE } from '~/utils/misc.tsx'

export function DataTableAddVideo() {
	const { filmId } = useParams()
	const fetcher = useFetcher()

	const [form, fields] = useForm({
		id: 'add-film-video-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmVideoSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<Dialog>
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
					<EnsurePE />
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
						<SearchSelectField
							labelProps={{
								htmlFor: fields.site.id,
								children: 'Site',
							}}
							selectProps={{
								...conform.input(fields.site, { type: 'text' }),
							}}
							options={SITES}
							errors={fields.site.errors}
						/>
						<SearchSelectField
							labelProps={{
								htmlFor: fields.type.id,
								children: 'Type',
							}}
							selectProps={{
								...conform.input(fields.type, { type: 'text' }),
							}}
							options={VIDEO_TYPES}
							errors={fields.type.errors}
						/>
						<SearchSelectField
							labelProps={{
								htmlFor: fields.quality.id,
								children: 'Quality',
							}}
							selectProps={{
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
