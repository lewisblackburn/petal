import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmKeywordsSchema = z.object({
	intent: z.literal('delete-film-keywords'),
	filmId: z.string(),
	keywords: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	invariantResponse(
		formData.get('intent') === 'delete-film-keywords',
		'Invalid intent',
	)

	const filmId = formData.get('filmId') as string
	const keywords = formData.get('keywords') as string

	invariantResponse(filmId, 'Invalid filmId')
	invariantResponse(keywords, 'Invalid keywords')

	const parsedKeywords = JSON.parse(keywords) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			keywords: {
				// NOTE: In this we case we want to disconnect no deleteMany
				disconnect: parsedKeywords.map(name => ({ name: name })),
			},
		},
	})

	return json({ status: 'success' } as const, {
		headers: await createToastHeaders({
			description: 'Keywords Deleted',
			type: 'success',
		}),
	})
}
