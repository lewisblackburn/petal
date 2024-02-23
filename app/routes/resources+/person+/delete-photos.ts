import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeletePersonImagesSchema = z.object({
	intent: z.literal('delete-person-images'),
	personId: z.string(),
	peopleIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	invariantResponse(
		formData.get('intent') === 'delete-film-taglines',
		'Invalid intent',
	)

	const personId = formData.get('personId') as string
	const peopleIds = formData.get('peopleIds') as string

	invariantResponse(personId, 'Invalid personId')
	invariantResponse(peopleIds, 'Invalid peopleIds')

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

	return json({ status: 'success' } as const, {
		headers: await createToastHeaders({
			description: 'Deleted Person Photos',
			type: 'success',
		}),
	})
}
