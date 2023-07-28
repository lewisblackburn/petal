import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { Form, useActionData } from '@remix-run/react'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { ErrorList, Field } from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import { PersonSearch } from '~/routes/resources+/people.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

export const AddPersonSchema = z.object({
	personId: z.string().nonempty({ message: 'You must select a person' }),
	character: z.string().nonempty(),
})

export async function action({ request, params }: DataFunctionArgs) {
	await requireUserId(request)
	const { filmId } = params
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddPersonSchema,
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

	let { personId, character } = submission.value

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

	return redirectWithToast('..', {
		title: 'Added Film Credit Member',
		variant: 'default',
	})
}

export default function AddPerson() {
	const actionData = useActionData<typeof action>()

	const [form, fields] = useForm({
		id: 'add-person-form',
		constraint: getFieldsetConstraint(AddPersonSchema),
		lastSubmission: actionData?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddPersonSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<Form method="POST" {...form.props}>
			<PersonSearch
				labelProps={{
					htmlFor: fields.personId.id,
				}}
				inputProps={{
					...conform.input(fields.personId, { type: 'text' }),
				}}
				errors={fields.personId.errors}
			/>
			<Field
				labelProps={{
					htmlFor: fields.character.id,
					children: 'Character',
				}}
				inputProps={{
					...conform.input(fields.character, { type: 'text' }),
					autoComplete: 'off',
				}}
				errors={fields.character.errors}
			/>
			<Button type="submit">Add Person</Button>
			<ErrorList errors={form.errors} id={form.errorId} />
		</Form>
	)
}
