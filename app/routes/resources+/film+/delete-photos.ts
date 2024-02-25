import { parse as parseURL } from 'path'
import { invariantResponse } from '@epic-web/invariant'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { s3DeleteHandler } from '#app/utils/s3.server'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmPhotosSchema = z.object({
	intent: z.literal('delete-film-photos'),
	filmId: z.string(),
	photoIds: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()

	invariantResponse(
		formData.get('intent') === 'delete-film-photos',
		'Invalid intent',
	)

	const filmId = formData.get('filmId') as string
	const photoIds = formData.get('photoIds') as string
	invariantResponse(photoIds, 'Invalid ids')

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
		images.map(image => {
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

	return json({ status: 'success' } as const, {
		headers: await createToastHeaders({
			description: 'Deleted Film Photos',
			type: 'success',
		}),
	})
}
