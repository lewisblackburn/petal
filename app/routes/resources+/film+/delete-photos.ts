import { parse as parseURL } from 'path'
import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { s3DeleteHandler } from '#app/utils/s3.server'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmPhotosSchema = z.object({
	filmId: z.string(),
	photoIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteFilmPhotosSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const { filmId, photoIds } = submission.value

	const parsedIds = JSON.parse(photoIds) as string[]

	// await prisma.$transaction(async $prisma => {
	const images = await prisma.filmPhoto.findMany({
		where: {
			id: {
				in: parsedIds,
			},
		},
		select: {
			filename: true,
		},
	})

	s3DeleteHandler(
		images.map((image) => {
			const { base: filename } = parseURL(image.filename)
			return filename
		}),
	)

	await prisma.filmPhoto.deleteMany(
		withQueryContext(
			{
				where: {
					id: {
						in: parsedIds,
					},
				},
			},
			{ userId, modelId: filmId },
		),
	)
	// })

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Deleted Film Photos',
				type: 'success',
			}),
		},
	)
}
