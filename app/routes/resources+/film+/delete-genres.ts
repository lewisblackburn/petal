import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmGenresSchema = z.object({
	filmId: z.string(),
	genreIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteFilmGenresSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const { filmId, genreIds } = submission.value

	const parsedIds = JSON.parse(genreIds) as string[]

	await prisma.film.update(
		withQueryContext(
			{
				where: { id: filmId },
				data: {
					genres: {
						// NOTE: In this we case we want to disconnect no deleteMany
						disconnect: parsedIds.map(id => ({ id })),
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
				description: 'Film Genre Deleted',
				type: 'success',
			}),
		},
	)
}
