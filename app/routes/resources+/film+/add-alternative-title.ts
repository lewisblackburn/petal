import { parseWithZod } from '@conform-to/zod'
import { type Prisma } from '@prisma/client'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
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

	await prisma.filmAlternateTitle.create(
		withQueryContext<Prisma.FilmAlternateTitleCreateArgs>(
			{
				data: {
					title: alternativeTitle,
					country,
					film: {
						connect: {
							id: filmId,
						},
					},
				},
			},
			{ userId, modelId: filmId },
		),
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
