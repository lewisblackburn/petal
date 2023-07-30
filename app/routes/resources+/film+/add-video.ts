import { parse } from '@conform-to/zod'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'
import { ensurePE } from '~/utils/misc.tsx'

export const AddFilmVideoSchema = z.object({
	filmId: z.string(),
	url: z.string().url(),
	site: z.string().nonempty(),
	type: z.string().nonempty(),
	name: z.string().nonempty(),
	quality: z.string().nonempty(),
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

	let { filmId, url, site, type, name, quality } = submission.value

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
					},
				},
			},
		})
		.catch(err => {
			ensurePE(formData, request)
			return redirectWithToast(`/films/${filmId}/edit/media`, {
				title: err.message,
				variant: 'destructive',
			})
		})

	ensurePE(formData, request)
	return redirectWithToast(`/films/${filmId}/edit/media`, {
		title: 'Added Film Video',
		variant: 'default',
	})
}
