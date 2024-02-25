import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { PETAL_BOT_ID } from '#app/utils/constants.js'

export const EditFilmPhotoSchema = z.object({
	id: z.string(),
	filmId: z.string(),
	type: z.enum(['poster', 'backdrop']),
	language: z.string(),
	url: z.string(),
	primary: z.boolean().default(false).optional(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()

	const submission = parseWithZod(formData, {
		schema: EditFilmPhotoSchema,
	})

	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { id, filmId, type, language, url, primary } = submission.value

	if (primary) {
		// FIXME: This should be a transaction to allow for rollbacks, however it timesout
		// due to this issue: https://github.com/prisma/prisma/discussions/20016 and https://github.com/prisma/prisma/discussions/20016
		// await prisma.$transaction(async $prisma => {
		// await prisma.$transaction(async $prisma => {
		const existingPrimaryPhoto = await prisma.filmPhoto.findFirst({
			where: { filmId, primary: true, type },
		})
		if (existingPrimaryPhoto) {
			await prisma.filmPhoto.update(
				withQueryContext(
					{
						where: { id: existingPrimaryPhoto.id },
						data: { primary: false },
					},
					{ userId: PETAL_BOT_ID, modelId: filmId },
				),
			)
		}
		await prisma.filmPhoto.update(
			withQueryContext(
				{
					where: { id },
					data: {
						primary: true,
						type,
						language,
						film: { update: { [type]: url } },
					},
				},
				{ userId, modelId: filmId },
			),
		)
		// })
	} else {
		await prisma.filmPhoto.update(
			withQueryContext(
				{
					where: { id },
					data: {
						primary: false,
						type,
						language,
					},
				},
				{ userId, modelId: filmId },
			),
		)
	}

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Edited Film Photo',
				type: 'success',
			}),
		},
	)
}
