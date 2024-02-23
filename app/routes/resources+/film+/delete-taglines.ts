import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmTaglinesSchema = z.object({
	intent: z.literal('delete-film-taglines'),
	taglineIds: z.string(),
	filmId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	invariantResponse(
		formData.get('intent') === 'delete-film-taglines',
		'Invalid intent',
	)

	const filmId = formData.get('filmId') as string
	const taglineIds = formData.get('taglineIds') as string

	invariantResponse(filmId, 'Invalid filmId')
	invariantResponse(taglineIds, 'Invalid taglineIds')

	const parsedIds = JSON.parse(taglineIds) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			taglines: {
				deleteMany: {
					id: {
						in: parsedIds,
					},
				},
			},
		},
	})

	return json({ status: 'success' } as const, {
		headers: await createToastHeaders({
			description: 'Taglines Deleted',
			type: 'success',
		}),
	})
}
