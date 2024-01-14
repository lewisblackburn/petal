import { parse } from '@conform-to/zod'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'
import { ActionFunctionArgs } from '@remix-run/node'

export const SetPrimaryFilmVideoSchema = z.object({
	filmId: z.string(),
	url: z.string(),
	type: z.enum(['trailer']),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	const submission = parse(formData, {
		schema: SetPrimaryFilmVideoSchema,
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

	let { filmId, url, type } = submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			[type]: {
				set: url,
			},
		},
	})

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: `Set Primary ${type}`,
			type: 'success',
		}),
	})
}
export { action as SetPrimaryFilmVideoAction }
