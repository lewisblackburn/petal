import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmProductionCompaniesSchema = z.object({
	ids: z.string().nonempty(),
	filmId: z.string().nonempty(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: DeleteFilmProductionCompaniesSchema,
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
			productionCompanies: {
				disconnect: ids.split(',').map(id => ({ id })),
			},
		},
	})

	return json(
		{ success: true },
		{
			headers: await createToastHeaders({
				description: 'Prodution Companies Deleted',
				type: 'success',
			}),
		},
	)
}
