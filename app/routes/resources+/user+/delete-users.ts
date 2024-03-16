import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	invariantResponse(
		formData.get('intent') === 'delete-users',
		'Invalid intent',
	)

	const userIds = formData.get('userIds') as string

	invariantResponse(userIds, 'Invalid userIds')

	const parsedIds = JSON.parse(userIds) as string[]

	await prisma.user.deleteMany({
		where: {
			id: {
				in: parsedIds
			}
		}
	})

	return json({ status: 'success' } as const, {
		headers: await createToastHeaders({
			description: 'User Deleted',
			type: 'success',
		}),
	})
}
