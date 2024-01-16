import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const SetPrimaryFilmPhotoSchema = z.object({
	filmId: z.string(),
	image: z.string(),
	type: z.enum(['poster', 'backdrop']),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	const submission = parse(formData, {
		schema: SetPrimaryFilmPhotoSchema,
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

	let { filmId, image, type } = submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			[type]: {
				set: image,
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

export { action as SetPrimaryFilmPhotoAction }
