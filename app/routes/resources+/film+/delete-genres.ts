import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmGenresSchema = z.object({
	intent: z.literal('delete-film-genres'),
	filmId: z.string(),
	genreIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	invariantResponse(
		formData.get('intent') === 'delete-film-genres',
		'Invalid intent',
	)

	const filmId = formData.get('filmId') as string
	const genreIds = formData.get('genreIds') as string

	invariantResponse(filmId, 'Invalid filmId')
	invariantResponse(genreIds, 'Invalid genreIds')

	const parsedIds = JSON.parse(genreIds) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			genres: {
				// NOTE: In this we case we want to disconnect no deleteMany
				disconnect: parsedIds.map(id => ({ id })),
			},
		},
	})

	return json({ status: 'success' } as const, {
		headers: await createToastHeaders({
			description: 'Film Genre Deleted',
			type: 'success',
		}),
	})
}
export { action as DeleteFilmGenresAction }
