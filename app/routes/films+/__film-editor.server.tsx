import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/server-runtime'
import { requireUserId } from '#app/utils/auth.server'
import { prisma } from '#app/utils/db.server'
import { FilmEditorSchema } from './__film-editor'
import { redirectWithToast } from '#app/utils/toast.server'

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)

	const formData = await request.formData()

	const submission = await parseWithZod(formData, {
		schema: FilmEditorSchema.superRefine(async (data, ctx) => {
			if (!data.id) return

			const film = await prisma.film.findUnique({
				where: { id: data.id },
			})
			if (!film) {
				ctx.addIssue({
					code: 'custom',
					message: 'Film not found',
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

	const {
		id: filmId,
		title,
		tagline,
		overview,
		runtime,
		releaseDate,
		language,
		ageRating,
		status,
		budget,
		revenue,
	} = submission.value

	const updatedFilm = await prisma.$transaction(async $prisma => {
		const film = await $prisma.film.upsert({
			select: { id: true },
			where: { id: filmId ?? '__new_film__' },
			create: {
				title,
				tagline,
				overview,
				runtime,
				releaseDate,
				language,
				ageRating,
				status,
				budget,
				revenue,
				lastUpdatedByUserId: userId,
			},
			update: {
				title,
				tagline,
				overview,
				runtime,
				releaseDate,
				language,
				ageRating,
				status,
				budget,
				revenue,
				lastUpdatedByUserId: userId,
			},
		})

		return film
	})

	return redirectWithToast(`/films/${updatedFilm.id}`, {
		type: 'success',
		title: 'Success',
		description: 'The film has been updated.',
	})
}
