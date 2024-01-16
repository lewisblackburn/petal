import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmReleaseInformationSchema = z.object({
	filmId: z.string(),
	code: z.string(),
	languageId: z.string(),
	date: z.date(),
	classification: z.string(),
	// TODO: This should be the film release types enum
	type: z.string(),
	note: z.string().optional(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmReleaseInformationSchema,
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

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Added Film Release Information',
			type: 'success',
		}),
	})
}
export { action as AddFilmReleaseInformationAction }
