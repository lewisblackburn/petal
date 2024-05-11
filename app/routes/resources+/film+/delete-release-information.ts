import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs , json } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmReleaseInformationSchema = z.object({
	filmId: z.string(),
	releaseInformationIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteFilmReleaseInformationSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const { filmId, releaseInformationIds } = submission.value

	const parsedIds = JSON.parse(releaseInformationIds) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			releaseInformation: {
				deleteMany: {
					id: {
						in: parsedIds,
					},
				},
			},
		},
	})

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Release Information Deleted',
				type: 'success',
			}),
		},
	)
}
