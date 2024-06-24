import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteUsersSchema = z.object({
	userIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteUsersSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: 400,
			},
		)
	}

	const { userIds } = submission.value

	const parsedIds = JSON.parse(userIds) as string[]

	await prisma.user.deleteMany({
		where: {
			id: {
				in: parsedIds,
			},
		},
	})

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Users Deleted',
				type: 'success',
			}),
		},
	)
}
