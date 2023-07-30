import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'
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

	ensurePE(formData, request)
	return redirectWithToast(`/films/${filmId}/edit/genres`, {
		title: 'Added Film Genre',
		variant: 'default',
	})
}
