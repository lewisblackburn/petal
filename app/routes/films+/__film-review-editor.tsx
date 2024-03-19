import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type FilmReview } from '@prisma/client'
import { Form, useFetcher } from '@remix-run/react'
import { type SerializeFrom } from '@remix-run/server-runtime'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { InputConform } from '#app/components/form/conform/Input.js'
import { TextareaConform } from '#app/components/form/conform/Textarea.js'
import { Field, FieldError } from '#app/components/form/Field.js'
import { Button } from '#app/components/ui/button.tsx'
import { Label } from '#app/components/ui/label.js'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { type action } from './__film-review-editor.server'

export const FilmReviewEditorSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1).max(50),
	content: z.string().min(1).max(500),
	rating: z.number().min(1).max(10),
})

export function FilmReviewEditor({
	review,
	rating,
}: {
	review?: SerializeFrom<Pick<FilmReview, 'id' | 'title' | 'content'>>
	rating?: number | null
}) {
	const filmReviewFetcher = useFetcher<typeof action>()
	const isPending = filmReviewFetcher.state !== 'idle'

	const [form, fields] = useForm({
		id: 'film-review-editor',
		constraint: getZodConstraint(FilmReviewEditorSchema),
		lastResult: filmReviewFetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: FilmReviewEditorSchema })
		},
		defaultValue: {
			title: review?.title,
			content: review?.content,
			rating: rating,
		},
	})

	return (
		<Form
			method="post"
			className="flex h-full flex-col gap-y-4"
			{...getFormProps(form)}
		>
			{review ? <input type="hidden" name="id" value={review.id} /> : null}
			<div className="flex flex-col gap-1">
				<Field>
					<Label htmlFor={fields.rating.id}>Rating</Label>
					{/* @ts-expect-error fix type later */}
					<InputConform meta={fields.rating} type="number" />
					{fields.rating.errors && (
						<FieldError>{fields.rating.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.title.id}>Title</Label>
					<InputConform meta={fields.title} type="text" />
					{fields.title.errors && (
						<FieldError>{fields.title.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.content.id}>Content</Label>
					<TextareaConform meta={fields.content} />
					{fields.content.errors && (
						<FieldError>{fields.content.errors}</FieldError>
					)}
				</Field>
			</div>
			<div className="flex justify-end gap-2">
				<Button form={form.id} variant="destructive" type="reset">
					Reset
				</Button>
				<StatusButton
					form={form.id}
					type="submit"
					disabled={isPending}
					status={isPending ? 'pending' : 'idle'}
				>
					Submit
				</StatusButton>
			</div>
		</Form>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No film with the id "{params.filmId}" exists</p>
				),
			}}
		/>
	)
}
