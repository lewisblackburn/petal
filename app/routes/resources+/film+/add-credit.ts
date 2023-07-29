import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

export const AddFilmCreditSchema = z.object({
	filmId: z.string(),
	personId: z.string().nonempty({ message: 'You must select a person' }),
	character: z.string().nonempty(),
	department: z.string().nonempty({ message: 'You must select a department' }),
	job: z.string().nonempty({ message: 'You must select a job' }),
})

export async function action({ request, params }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmCreditSchema,
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

	let { filmId, personId, character, department, job } = submission.value

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
					department,
					job,
				},
			},
		},
	})

	return redirectWithToast(`/films/${filmId}/edit`, {
		title: 'Added Film Credit Member',
		variant: 'default',
	})
}
