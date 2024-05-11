import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs , json } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmKeywordsSchema = z.object({
	filmId: z.string(),
	keywords: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteFilmKeywordsSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const { filmId, keywords } = submission.value

	const parsedKeywords = JSON.parse(keywords) as string[]

	await prisma.film.update(
		withQueryContext(
			{
				where: { id: filmId },
				data: {
					keywords: {
						// NOTE: In this we case we want to disconnect no deleteMany
						disconnect: parsedKeywords.map(name => ({ name: name })),
					},
				},
			},
			{ modelId: filmId, userId },
		),
	)

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Keywords Deleted',
				type: 'success',
			}),
		},
	)
}
