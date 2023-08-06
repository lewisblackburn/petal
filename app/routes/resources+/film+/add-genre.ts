import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { flashMessage } from '~/utils/flash-session.server.ts'
import { ensurePE } from '~/utils/misc.tsx'

export const AddFilmGenreSchema = z.object({
	filmId: z.string(),
	genreId: z.string().nonempty({ message: 'You must select a genre' }),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmGenreSchema,
		acceptMultipleErrors: () => true,
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
	await prisma.film
		.update({
			where: { id: filmId },
			data: {
				genres: {
					connect: {
						id: genreId,
					},
				},
			},
		})
		.catch(err => {
			ensurePE(formData, request)
			return json({
				status: 400,
				headers: flashMessage({
					toast: {
						title: err.message,
						variant: 'destructive',
					},
				}),
			})
		})

	ensurePE(formData, request)
	return json(
		{ success: true },
		{
			headers: await flashMessage({
				toast: {
					title: 'Added Film Genre',
				},
			}),
		},
	)
}
