import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'
import { ensurePE } from '~/utils/misc.tsx'

export const DeleteFilmVideosSchema = z.object({
	ids: z.string().nonempty(),
	filmId: z.string().nonempty(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: DeleteFilmVideosSchema,
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

	let { filmId, ids } = submission.value

	await prisma.film
		.update({
			where: { id: filmId },
			data: {
				videos: {
					deleteMany: {
						id: {
							in: JSON.parse(ids) as string[],
						},
					},
				},
			},
		})
		.catch(err => {
			ensurePE(formData, request)
			return redirectWithToast(
				`/films/${filmId}/edit/video`,
				{
					title: err.message,
					variant: 'destructive',
				},
				{ status: 400 },
			)
		})

	ensurePE(formData, request)
	return redirectWithToast(`/films/${filmId}/edit/video`, {
		title: 'Deleted Film Videos',
		variant: 'destructive',
	})
}
