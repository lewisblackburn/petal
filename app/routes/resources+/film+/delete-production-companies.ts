import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmProductionCompaniesSchema = z.object({
	intent: z.literal('delete-film-production-companies'),
	filmId: z.string(),
	productionCompanyIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	invariantResponse(
		formData.get('intent') === 'delete-film-production-companies',
		'Invalid intent',
	)

	const filmId = formData.get('filmId') as string
	const productionCompanyIds = formData.get('productionCompanyIds') as string

	invariantResponse(filmId, 'Invalid filmId')
	invariantResponse(productionCompanyIds, 'Invalid productionCompanyIds')

	const parsedIds = JSON.parse(productionCompanyIds) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			productionCompanies: {
				disconnect: parsedIds.map(id => ({ id })),
			},
		},
	})

	return json({ status: 'success' } as const, {
		headers: await createToastHeaders({
			description: 'Prodution Companies Deleted',
			type: 'success',
		}),
	})
}
export { action as DeleteFilmProductionCompaniesAction }
