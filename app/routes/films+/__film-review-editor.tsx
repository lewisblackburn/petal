import { getInputProps, getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type FilmReview } from '@prisma/client'
import { type ActionFunctionArgs } from '@remix-run/node'
import { Form, useFetcher } from '@remix-run/react'
import { json, type SerializeFrom } from '@remix-run/server-runtime'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { ErrorList, Field, TextareaField } from '#app/components/forms.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { updateFilmVoteAverageAndCount } from '#app/utils/film'
import { redirectWithToast } from '#app/utils/toast.server.ts'

const FilmReviewEditorSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1).max(50),
	content: z.string().min(1).max(500),
	rating: z.number().min(1).max(10),
})

export async function action({ request, params }: ActionFunctionArgs) {
	const userId = await requireUserId(request)

	const formData = await request.formData()

	const submission = await parseWithZod(formData, {
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

	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const { id: reviewId, title, content, rating } = submission.value

	const updatedReview = await prisma.$transaction(async $prisma => {
		await $prisma.filmRating.upsert({
			where: { filmId_userId: { filmId: params.filmId!, userId } },
			create: {
				filmId: params.filmId!,
				userId,
				value: rating,
			},
			update: {
				value: rating,
			},
		})

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

		await updateFilmVoteAverageAndCount($prisma, params.filmId!)

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
				<Field
					labelProps={{ children: 'Rating' }}
					inputProps={{
						...getInputProps(fields.rating, {
							ariaAttributes: true,
							type: 'number',
						}),
					}}
					errors={fields.rating.errors}
				/>
				<Field
					labelProps={{ children: 'Title' }}
					inputProps={{
						...getInputProps(fields.title, {
							ariaAttributes: true,
							type: 'text',
						}),
					}}
					errors={fields.title.errors}
				/>
				<TextareaField
					labelProps={{ children: 'Content' }}
					textareaProps={{
						...getInputProps(fields.content, {
							ariaAttributes: true,
							type: 'text',
						}),
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
