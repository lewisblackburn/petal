import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/server-runtime'
import { requireUserId } from '#app/utils/auth.server'
import { prisma } from '#app/utils/db.server'
import { redirectWithToast } from '#app/utils/toast.server'
import { PersonEditorSchema } from './__person-editor'

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)

	const formData = await request.formData()

	const submission = await parseWithZod(formData, {
		schema: PersonEditorSchema.superRefine(async (data, ctx) => {
			if (!data.id) return

			const person = await prisma.person.findUnique({
				select: { id: true },
				where: { id: data.id },
			})
			if (!person) {
				ctx.addIssue({
					code: 'custom',
					message: 'Person not found',
				})
			}
		}),
		async: true,
	})

	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const {
		id: personId,
		name,
		knownForDepartment,
		biography,
		birthdate,
		dayOfDeath,
		gender,
		placeOfBirth,
		homepage,
	} = submission.value

	const updatedPerson = await prisma.$transaction(async $prisma => {
		const person = await $prisma.person.upsert({
			select: { id: true },
			where: { id: personId ?? '__new_pesron__' },
			create: {
				name,
				knownForDepartment,
				biography,
				birthdate,
				dayOfDeath,
				gender,
				placeOfBirth,
				homepage,
			},
			update: {
				name,
				knownForDepartment,
				biography,
				birthdate,
				dayOfDeath,
				gender,
				placeOfBirth,
				homepage,
			},
		})

		return person
	})

	return redirectWithToast(`/people/${updatedPerson.id}`, {
		type: 'success',
		title: 'Success',
		description: 'The person has been updated.',
	})
}
