import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmCastMemberSchema = z.object({
	filmId: z.string(),
	personId: z.string().nonempty({ message: 'You must select a person' }),
	character: z.string().min(1),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	const submission = parse(formData, {
		schema: AddFilmCastMemberSchema,
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

	let { filmId, personId, character } = submission.value

	// Find the maximum numerator for the current film
	const maxNumerator = await prisma.castMember
		.findFirst({
			where: { filmId },
			orderBy: { numerator: 'desc' },
			select: { numerator: true },
		})
		.then(result => result?.numerator ?? 0)

	const newNumerator = maxNumerator + 1

	await prisma.film.update({
		where: { id: filmId },
		data: {
			cast: {
				create: {
					person: {
						connect: {
							id: personId,
						},
					},
					numerator: newNumerator,
					denominator: 1,
					character,
				},
			},
		},
	})

	return json(
		{ success: true },
		{
			headers: await createToastHeaders({
				description: 'Cast Member Added',
				type: 'success',
			}),
		},
	)
}
