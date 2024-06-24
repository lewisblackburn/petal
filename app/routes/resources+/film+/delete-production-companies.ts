import { parseWithZod } from '@conform-to/zod'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmProductionCompaniesSchema = z.object({
	filmId: z.string(),
	productionCompanyIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteFilmProductionCompaniesSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const { filmId, productionCompanyIds } = submission.value

	const parsedIds = JSON.parse(productionCompanyIds) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			productionCompanies: {
				disconnect: parsedIds.map((id) => ({ id })),
			},
		},
	})

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Prodution Companies Deleted',
				type: 'success',
			}),
		},
	)
}
