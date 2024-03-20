import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmsSchema = z.object({
	filmIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteFilmsSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const { filmIds } = submission.value

	const parsedIds = JSON.parse(filmIds) as string[]

	await prisma.film.deleteMany({
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
				description: 'Films Deleted',
				type: 'success',
			}),
		},
	)
}
