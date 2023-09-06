import { parse } from '@conform-to/zod'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const SetPrimaryPersonImageSchema = z.object({
	personId: z.string(),
	image: z.string(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	const submission = parse(formData, {
		schema: SetPrimaryPersonImageSchema,
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

	let { personId, image } = submission.value

	console.log(personId, image)

	await prisma.person.update({
		where: { id: personId },
		data: {
			image,
		},
	})

	return json(
		{ success: true },
		{
			headers: await createToastHeaders({
				description: 'Set Primary Image',
				type: 'success',
			}),
		},
	)
}
