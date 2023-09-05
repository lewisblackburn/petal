import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmCrewMemberSchema = z.object({
	filmId: z.string(),
	personId: z.string().nonempty({ message: 'You must select a person' }),
	department: z.string().nonempty({ message: 'You must select a department' }),
	job: z.string().nonempty({ message: 'You must select a job' }),
	featured: z.boolean().optional(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	const submission = parse(formData, {
		schema: AddFilmCrewMemberSchema,
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

	let { filmId, personId, department, job, featured } = submission.value

	await prisma.film.update({
		where: { id: filmId },
		data: {
			crew: {
				create: {
					person: {
						connect: {
							id: personId,
						},
					},
					department,
					job,
					featured: featured,
				},
			},
		},
	})

	return json(
		{ success: true },
		{
			headers: await createToastHeaders({
				description: 'Crew Member Added',
				type: 'success',
			}),
		},
	)
}
