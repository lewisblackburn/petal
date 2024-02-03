import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { log } from '#app/utils/log'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmAlternativeTitleSchema = z.object({
	filmId: z.string(),
	alternativeTitle: z.string(),
	country: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: AddFilmAlternativeTitleSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { filmId, alternativeTitle, country } = submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			alternativeTitles: {
				create: {
					title: alternativeTitle,
					country,
				},
			},
		},
	})

	log(
		'Film',
		filmId,
		submission.value,
		// NOTE: This is so the difference has something to compare the object to
		{ alternativeTitle: '', code: '' },
		userId,
	)

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Added Film Alternative Title',
				type: 'success',
			}),
		},
	)
}

export { action as AddFilmAlternativeTitleAction }
