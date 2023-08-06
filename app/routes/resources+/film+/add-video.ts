import { parse } from '@conform-to/zod'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { flashMessage } from '~/utils/flash-session.server.ts'
import { ensurePE } from '~/utils/misc.tsx'
import { checkboxSchema } from '~/utils/zod-extensions.ts'

// FIX: Add primary video
export const AddFilmVideoSchema = z.object({
	filmId: z.string(),
	url: z.string().url(),
	site: z.string().nonempty(),
	type: z.string().nonempty(),
	name: z.string().nonempty(),
	quality: z.string().nonempty(),
	primary: checkboxSchema(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmVideoSchema,
		acceptMultipleErrors: () => true,
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
				photos: {
					where: {
						type,
						primary: true,
					},
				},
			},
		})

		if (primaryVideo?.photos.length) {
			return json({
				status: 400,
				headers: await flashMessage({
					toast: {
						title: 'Primary Photo of That Type Already Exists',
						variant: 'destructive',
					},
				}),
			})
		}
	}

	await prisma.film
		.update({
			where: { id: filmId },
			data: {
				videos: {
					create: {
						url,
						site,
						type,
						name,
						quality,
						primary,
					},
				},
			},
		})
		.catch(err => {
			ensurePE(formData, request)
			return json({
				status: 400,
				headers: flashMessage({
					toast: {
						title: err.message,
						variant: 'destructive',
					},
				}),
			})
		})

	ensurePE(formData, request)
	return json(
		{ success: true },
		{
			headers: await flashMessage({
				toast: {
					title: 'Added Film Video',
				},
			}),
		},
	)
}
