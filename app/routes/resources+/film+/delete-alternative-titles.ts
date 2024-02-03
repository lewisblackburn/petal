import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { log } from '#app/utils/log'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmAlternativeTitlesSchema = z.object({
	intent: z.literal('delete-film-alternative-titles'),
	filmId: z.string(),
	alternativeTitleIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	invariantResponse(
		formData.get('intent') === 'delete-film-alternative-titles',
		'Invalid intent',
	)

	const filmId = formData.get('filmId') as string
	const alternativeTitleIds = formData.get('alternativeTitleIds') as string

	invariantResponse(filmId, 'Invalid filmId')
	invariantResponse(alternativeTitleIds, 'Invalid alternativeTitleIds')

	const parsedIds = JSON.parse(alternativeTitleIds) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			alternativeTitles: {
				deleteMany: {
					id: {
						in: parsedIds,
					},
				},
			},
		},
	})

	log('Film', filmId, { alternativeTitleIds: [] }, parsedIds, userId)

	return json({ status: 'success' } as const, {
		headers: await createToastHeaders({
			description: 'Alternative Titles Deleted',
			type: 'success',
		}),
	})
}

export { action as DeleteFilmAlternativeTitlesAction }
