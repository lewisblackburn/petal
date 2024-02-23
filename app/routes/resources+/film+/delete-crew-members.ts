import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmCrewMembersSchema = z.object({
	intent: z.literal('delete-film-crew-members'),
	filmId: z.string(),
	crewMemberIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	invariantResponse(
		formData.get('intent') === 'delete-film-crew-members',
		'Invalid intent',
	)

	const filmId = formData.get('filmId') as string
	const crewMemberIds = formData.get('crewMemberIds') as string

	invariantResponse(filmId, 'Invalid filmId')
	invariantResponse(crewMemberIds, 'Invalid crewMemberIds')

	const parsedIds = JSON.parse(crewMemberIds) as string[]

	await prisma.film.update({
		where: { id: filmId },
		data: {
			crew: {
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
			description: 'Crew Members Deleted',
			type: 'success',
		}),
	})
}
