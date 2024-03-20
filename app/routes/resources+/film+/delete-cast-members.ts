import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmCastMembersSchema = z.object({
	filmId: z.string(),
	castMemberIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteFilmCastMembersSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const { filmId, castMemberIds } = submission.value

	const parsedIds = JSON.parse(castMemberIds) as string[]

	await prisma.filmCastMember.deleteMany(
		withQueryContext(
			{
				where: {
					id: {
						in: parsedIds,
					},
				},
			},
			{ userId, modelId: filmId },
		),
	)

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Cast Members Deleted',
				type: 'success',
			}),
		},
	)
}
