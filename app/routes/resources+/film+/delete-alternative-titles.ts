import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { log } from '#app/utils/log'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmAlternativeTitlesSchema = z.object({
	ids: z.string(),
	filmId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: DeleteFilmAlternativeTitlesSchema,
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

	let { filmId, ids } = submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			alternativeTitles: {
				deleteMany: {
					id: {
						in: JSON.parse(ids) as string[],
					},
				},
			},
		},
	})

	log('delete', 'Film', filmId, { ids: [] }, submission.value, userId)

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Alternative Titles Deleted',
			type: 'success',
		}),
	})
}

export { action as DeleteFilmAlternativeTitlesAction }
