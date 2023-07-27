import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

// ({ message: 'You must select a person' }),
export const AddFilmCreditMemberSchema = z.object({
	filmId: z.string().nonempty(),
	personId: z.string().nonempty(),
	person: z.string().nonempty(),
	character: z.string().nonempty(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmCreditMemberSchema,
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

	let { filmId, personId, character } = submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			credits: {
				create: {
					person: {
						connect: {
							id: personId,
						},
					},
					character,
					department: 'acting',
					job: 'actor',
				},
			},
		},
	})

	return redirectWithToast(`/films/${filmId}/edit`, {
		title: 'Added Film Credit Member',
		variant: 'default',
	})
}
