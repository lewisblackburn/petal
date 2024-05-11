import { parseWithZod } from '@conform-to/zod'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeletePersonPhotosSchema = z.object({
	personId: z.string(),
	peopleIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeletePersonPhotosSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: 400,
			},
		)
	}

	const { personId, peopleIds } = submission.value

	const parsedIds = JSON.parse(peopleIds) as string[]

	await prisma.person.update({
		where: { id: personId },
		data: {
			photos: {
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
				description: 'Deleted Person Photos',
				type: 'success',
			}),
		},
	)
}
