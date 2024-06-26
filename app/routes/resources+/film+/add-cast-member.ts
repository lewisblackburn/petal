import { parseWithZod } from '@conform-to/zod'
import { type Prisma } from '@prisma/client'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmCastMemberSchema = z.object({
	filmId: z.string(),
	personId: z.string(),
	character: z.string().min(1),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()

	const submission = parseWithZod(formData, {
		schema: AddFilmCastMemberSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { filmId, personId, character } = submission.value

	// Find the maximum numerator for the current film
	const maxNumerator = await prisma.filmCastMember
		.findFirst({
			where: { filmId },
			orderBy: { numerator: 'desc' },
			select: { numerator: true },
		})
		.then((result) => result?.numerator ?? 0)

	const newNumerator = maxNumerator + 1

	await prisma.filmCastMember.create(
		withQueryContext<Prisma.FilmCastMemberCreateArgs>(
			{
				data: {
					film: {
						connect: {
							id: filmId,
						},
					},
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
			{ userId, modelId: filmId },
		),
	)

	return json(
		{
			result: submission.reply(),
		},
		{
			headers: await createToastHeaders({
				description: 'Cast Member Added',
				type: 'success',
			}),
		},
	)
}
