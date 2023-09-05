import { parse } from '@conform-to/zod'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

// FIX: Add primary video
export const AddFilmVideoSchema = z.object({
	filmId: z.string(),
	url: z.string().url(),
	site: z.string().nonempty(),
	type: z.string().nonempty(),
	name: z.string().nonempty(),
	quality: z.string().nonempty(),
	primary: z.boolean().optional(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmVideoSchema,
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

	let { filmId, url, site, type, name, quality, primary } = submission.value

	// check if a primary video of that type already exists
	if (primary) {
		const primaryVideo = await prisma.film.findFirst({
			where: {
				id: filmId,
			},
			select: {
				videos: {
					where: {
						type,
						primary: true,
					},
				},
			},
		})

		if (primaryVideo?.videos.length) {
			return json(
				{ success: true },
				{
					headers: await createToastHeaders({
						description: 'A primary video of that type already exists',
						type: 'success',
					}),
				},
			)
		}
	}

	await prisma.film.update({
		where: { id: filmId },
		data: {
			videos: {
				create: {
					url,
					site,
					type,
					name,
					quality,
					primary: primary ?? false,
				},
			},
		},
	})

	return json(
		{ success: true },
		{
			headers: await createToastHeaders({
				description: 'Added Film Photo',
				type: 'success',
			}),
		},
	)
}
