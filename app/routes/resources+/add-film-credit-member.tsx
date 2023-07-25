import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

export const AddFilmCreditMemberSchema = z.object({
	filmId: z.string().nonempty(),
	personId: z.string().nonempty({ message: 'You must select a person' }),
	fruit: z.string().nonempty(),
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

	let { filmId, personId } = submission.value

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
					character: 'character name',
					// TODO: implement
					job: 'actor',
					department: 'acting',
				},
			},
		},
	})

	return redirectWithToast(`/films/${filmId}/edit`, {
		title: 'Added Film Credit Member',
		variant: 'default',
	})
}
