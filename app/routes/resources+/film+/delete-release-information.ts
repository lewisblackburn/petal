import { parse } from '@conform-to/zod'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'
import { ActionFunctionArgs } from '@remix-run/node'

export const DeleteFilmReleaseInformationSchema = z.object({
	ids: z.string(),
	filmId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: DeleteFilmReleaseInformationSchema,
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
			releaseInformation: {
				deleteMany: {
					id: {
						in: JSON.parse(ids) as string[],
					},
				},
			},
		},
	})

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Release Information Deleted',
			type: 'success',
		}),
	})
}

export { action as DeleteFilmReleaseInformationAction }
