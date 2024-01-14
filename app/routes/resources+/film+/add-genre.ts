import { parse } from '@conform-to/zod'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'
import { ActionFunctionArgs } from '@remix-run/node'

export const AddFilmGenreSchema = z.object({
	filmId: z.string(),
	genreId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmGenreSchema,
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

	let { filmId, genreId } = submission.value

	// NOTE: Here it won't return an error if the genre is already connected to the film,
	// but it will return any other error. I think this is fine as it won't cause any
	// confusion, but it's worth noting.
	await prisma.film.update({
		where: { id: filmId },
		data: {
			genres: {
				connect: {
					id: genreId,
				},
			},
		},
	})

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Added Film Genre',
			type: 'success',
		}),
	})
}

export { action as AddFilmGenreAction }
