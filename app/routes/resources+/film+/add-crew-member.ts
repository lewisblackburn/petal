import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { flashMessage } from '~/utils/flash-session.server.ts'
import { ensurePE } from '~/utils/misc.tsx'

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

	await prisma.film
		.update({
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
		.catch(err => {
			ensurePE(formData, request)
			return json({
				status: 400,
				headers: flashMessage({
					toast: {
						title: err.message,
						variant: 'destructive',
					},
				}),
			})
		})

	ensurePE(formData, request)
	return json(
		{ success: true },
		{
			headers: await flashMessage({
				toast: {
					title: 'Added Film Crew Member',
				},
			}),
		},
	)
}
