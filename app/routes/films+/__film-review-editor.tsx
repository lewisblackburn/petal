import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { type FilmReview } from '@prisma/client'
import { Form, useFetcher } from '@remix-run/react'
import {
	type DataFunctionArgs,
	json,
	type SerializeFrom,
} from '@remix-run/server-runtime'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { ErrorList, Field, TextareaField } from '#app/components/forms.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'

const FilmReviewEditorSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1).max(50),
	content: z.string().min(1).max(500),
})

export async function action({ request, params }: DataFunctionArgs) {
	const userId = await requireUserId(request)

	const formData = await request.formData()

	const submission = await parse(formData, {
		schema: FilmReviewEditorSchema.superRefine(async (data, ctx) => {
			if (!data.id) return

			const review = await prisma.filmReview.findUnique({
				select: { id: true },
				where: {
					filmId_userId: { filmId: params.filmId ?? '__film__', userId },
				},
			})
			if (!review) {
				ctx.addIssue({
					code: 'custom',
					message: 'Film review not found',
				})
			}
		}),
		async: true,
	})

	if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}

	if (!submission.value) {
		return json({ status: 'error', submission } as const, { status: 400 })
	}

	const { id: reviewId, title, content } = submission.value

	const updatedReview = await prisma.$transaction(async $prisma => {
		const review = await $prisma.filmReview.upsert({
			select: { id: true },
			where: { id: reviewId ?? '__new_review__' },
			create: {
				filmId: params.filmId!,
				userId,
				title,
				content,
			},
			update: {
				title,
				content,
			},
		})

		return review
	})

	return redirectWithToast(
		`/films/${params.filmId!}/reviews/${updatedReview.id}`,
		{
			type: 'success',
			title: 'Success',
			description: 'The film review has been updated.',
		},
	)
}

export function FilmReviewEditor({
	review,
}: {
	review?: SerializeFrom<Pick<FilmReview, 'id' | 'title' | 'content'>>
}) {
	const filmReviewFetcher = useFetcher<typeof action>()
	const isPending = filmReviewFetcher.state !== 'idle'

	const [form, fields] = useForm({
		id: 'film-review-editor',
		constraint: getFieldsetConstraint(FilmReviewEditorSchema),
		lastSubmission: filmReviewFetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: FilmReviewEditorSchema })
		},
		defaultValue: {
			title: review?.title,
			content: review?.content,
		},
	})

	return (
		<Form
			method="post"
			className="flex h-full flex-col gap-y-4"
			{...form.props}
		>
			{review ? <input type="hidden" name="id" value={review.id} /> : null}
			<div className="flex flex-col gap-1">
				<Field
					labelProps={{ children: 'Title' }}
					inputProps={{
						...conform.textarea(fields.title, { ariaAttributes: true }),
					}}
					errors={fields.title.errors}
				/>
				<TextareaField
					labelProps={{ children: 'Content' }}
					textareaProps={{
						...conform.textarea(fields.content, { ariaAttributes: true }),
					}}
					errors={fields.content.errors}
				/>
			</div>
			<ErrorList id={form.errorId} errors={form.errors} />
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
