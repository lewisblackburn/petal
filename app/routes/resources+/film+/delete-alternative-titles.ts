import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteAlternativeTitlesSchema = z.object({
	filmId: z.string(),
	alternativeTitleIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteAlternativeTitlesSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const { filmId, alternativeTitleIds } = submission.value

	const parsedIds = JSON.parse(alternativeTitleIds) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			alternativeTitles: {
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
				description: 'Alternative Titles Deleted',
				type: 'success',
			}),
		},
	)
}
