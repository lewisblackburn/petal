import { parse as parseURL } from 'path'
import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { s3DeleteHandler } from '#app/utils/s3.server'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const DeleteFilmPhotosSchema = z.object({
	ids: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: DeleteFilmPhotosSchema,
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

	let { ids } = submission.value

	await prisma.$transaction(async $prisma => {
		const images = await $prisma.filmPhoto.findMany({
			where: {
				id: {
					in: JSON.parse(ids) as string[],
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

		await $prisma.filmPhoto.deleteMany({
			where: {
				id: {
					in: JSON.parse(ids) as string[],
				},
			},
		})
	})

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Deleted Film Photos',
			type: 'success',
		}),
	})
}

export { action as DeleteFilmPhotosAction }
