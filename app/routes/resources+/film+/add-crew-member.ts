import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmCrewMemberSchema = z.object({
	filmId: z.string(),
	personId: z.string(),
	department: z.string(),
	job: z.string(),
	featured: z.boolean().optional(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()

	const submission = parseWithZod(formData, {
		schema: AddFilmCrewMemberSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { filmId, personId, department, job, featured } = submission.value

	await prisma.filmCrewMember.create(
		withQueryContext(
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
					department,
					job,
					featured,
				},
			},
			{ userId, modelId: filmId },
		),
	)

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Crew Member Added',
				type: 'success',
			}),
		},
	)
}
