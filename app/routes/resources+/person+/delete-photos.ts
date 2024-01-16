import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeletePersonImagesSchema = z.object({
	ids: z.string(),
	personId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: DeletePersonImagesSchema,
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

	let { personId, ids } = submission.value

	await prisma.person.update({
		where: { id: personId },
		data: {
			photos: {
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
			description: 'Deleted Person Photos',
			type: 'success',
		}),
	})
}

export { action as DeletePersonPhotosAction }
