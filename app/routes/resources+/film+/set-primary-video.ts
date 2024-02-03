import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const SetPrimaryFilmVideoSchema = z.object({
	filmId: z.string(),
	url: z.string(),
	type: z.enum(['trailer']),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	const submission = parseWithZod(formData, {
		schema: SetPrimaryFilmVideoSchema,
	})

	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { filmId, url, type } = submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			[type]: {
				set: url,
			},
		},
	})

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: `Set Primary ${type}`,
				type: 'success',
			}),
		},
	)
}
export { action as SetPrimaryFilmVideoAction }
