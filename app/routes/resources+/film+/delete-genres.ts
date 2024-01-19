import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmGenresSchema = z.object({
	ids: z.string(),
	filmId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: DeleteFilmGenresSchema,
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

	const parsedIds = JSON.parse(ids) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			genres: {
				// NOTE: In this we case we want to disconnect no deleteMany
				disconnect: parsedIds.map(id => ({ id })),
			},
		},
	})

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Film Genre Deleted',
			type: 'success',
		}),
	})
}
export { action as DeleteFilmGenresAction }
