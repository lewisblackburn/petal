import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/server-runtime'
import { requireUserId } from '#app/utils/auth.server'
import { prisma } from '#app/utils/db.server'
import { redirectWithToast } from '#app/utils/toast.server'
import { FilmReviewEditorSchema } from './__film-review-editor'

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
