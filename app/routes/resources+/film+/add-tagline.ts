import { parse } from '@conform-to/zod'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'
import { ActionFunctionArgs } from '@remix-run/node'

export const AddFilmTaglineSchema = z.object({
	filmId: z.string(),
	tagline: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmTaglineSchema,
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

	let { filmId, tagline } = submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			taglines: {
				create: {
					tagline,
				},
			},
		},
	})

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Added Film Tagline',
			type: 'success',
		}),
	})
}

export { action as AddFilmTaglineAction }
