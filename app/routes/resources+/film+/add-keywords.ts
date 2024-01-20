import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmKeywordsSchema = z.object({
	filmId: z.string(),
	keywords: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmKeywordsSchema,
	})
	if (!submission.value) {
		return json(
			{
				status: 'error',
				submission,
			} as const,
			{ status: 400 },
		)
	}

	let { filmId, keywords } = submission.value

	const keywordList = keywords.split(',')

	await prisma.film.update({
		where: { id: filmId },
		data: {
			keywords: {
				connectOrCreate: keywordList.map(keyword => ({
					where: { name: keyword },
					create: { name: keyword },
				})),
			},
		},
	})

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Added Film Keywords',
			type: 'success',
		}),
	})
}
export { action as AddFilmKeywordsAction }
