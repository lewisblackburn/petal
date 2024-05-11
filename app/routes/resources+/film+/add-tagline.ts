import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs , json } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmTaglineSchema = z.object({
	filmId: z.string(),
	tagline: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: AddFilmTaglineSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
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

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Added Film Tagline',
				type: 'success',
			}),
		},
	)
}
