import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'
import { withQueryContext } from '#app/utils/misc.js'

export const AddFilmGenreSchema = z.object({
	filmId: z.string(),
	genreId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: AddFilmGenreSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { filmId, genreId } = submission.value

	// NOTE: Here it won't return an error if the genre is already connected to the film,
	// but it will return any other error. I think this is fine as it won't cause any
	// confusion, but it's worth noting.
	await prisma.film.update(
		withQueryContext(
			{
				where: { id: filmId },
				data: {
					genres: {
						connect: {
							id: genreId,
						},
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
				description: 'Added Film Genre',
				type: 'success',
			}),
		},
	)
}
