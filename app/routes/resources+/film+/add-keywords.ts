import { parseWithZod } from '@conform-to/zod'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmKeywordsSchema = z.object({
	filmId: z.string(),
	keywords: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: AddFilmKeywordsSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { filmId, keywords } = submission.value

	const keywordList = keywords.split(',').map((keyword) => keyword.trim())

	await prisma.film.update(
		withQueryContext(
			{
				where: { id: filmId },
				data: {
					keywords: {
						connectOrCreate: keywordList.map((keyword) => ({
							where: { name: keyword },
							create: { name: keyword },
						})),
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
				description: 'Added Film Keywords',
				type: 'success',
			}),
		},
	)
}
