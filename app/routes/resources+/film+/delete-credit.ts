import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

export const DeleteFilmCreditSchema = z.object({
	id: z.string().nonempty(),
	filmId: z.string().nonempty(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: DeleteFilmCreditSchema,
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

	let { filmId, id } = submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			credits: {
				delete: {
					id,
				},
			},
		},
	})

	return redirectWithToast(`/films/${filmId}/edit`, {
		title: 'Deleted Film Credit Member',
		variant: 'destructive',
	})
}
