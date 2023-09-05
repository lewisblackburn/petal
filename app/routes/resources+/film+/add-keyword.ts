import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmKeywordSchema = z.object({
	filmId: z.string().nonempty(),
	keyword: z.string().nonempty(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmKeywordSchema,
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

	let { filmId, keyword } = submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			keywords: {
				create: {
					name: keyword,
				},
			},
		},
	})

	return json(
		{ success: true },
		{
			headers: await createToastHeaders({
				description: 'Added Film Keyword',
				type: 'success',
			}),
		},
	)
}
