import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	invariantResponse(
		formData.get('intent') === 'delete-film-cast-members',
		'Invalid intent',
	)

	const filmId = formData.get('filmId') as string
	const castMemberIds = formData.get('castMemberIds') as string

	invariantResponse(filmId, 'Invalid filmId')
	invariantResponse(castMemberIds, 'Invalid castMemberIds')

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

	return json({ status: 'success' } as const, {
		headers: await createToastHeaders({
			description: 'Cast Members Deleted',
			type: 'success',
		}),
	})
}
