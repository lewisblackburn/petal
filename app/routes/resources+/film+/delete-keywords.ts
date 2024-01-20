import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmKeywordsSchema = z.object({
	names: z.string(),
	filmId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: DeleteFilmKeywordsSchema,
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

	let { filmId, names } = submission.value

	const parsedNames = JSON.parse(names) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			keywords: {
				// NOTE: In this we case we want to disconnect no deleteMany
				disconnect: parsedNames.map(name => ({ name })),
			},
		},
	})

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Keywords Deleted',
			type: 'success',
		}),
	})
}

export { action as DeleteFilmKeywordsAction }
