import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmAlternativeTitleSchema = z.object({
	filmId: z.string().nonempty(),
	code: z.string().nonempty({ message: 'You must select a country' }),
	languageId: z.string().nonempty({ message: 'You must select a country' }),
	date: z.string(),
	classification: z.string(),
	// TODO: This should be the film release types enum
	type: z.string(),
	note: z.string().optional(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmAlternativeTitleSchema,
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

	let { filmId, code, languageId, date, classification, type, note } =
		submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			releaseInformation: {
				create: {
					countryCode: code,
					languageId,
					date,
					classification,
					type,
					note,
				},
			},
		},
	})

	return json(
		{ success: true },
		{
			headers: await createToastHeaders({
				description: 'Added Film Release Information',
				type: 'success',
			}),
		},
	)
}
