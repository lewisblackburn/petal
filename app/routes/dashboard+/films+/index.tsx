import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'
import { createToastHeaders } from '#app/utils/toast.server.js'
import { ErrorList, Field } from '#app/components/forms.js'
import { Input } from '#app/components/ui/input.js'
import { Label } from '#app/components/ui/label.js'
import { StatusButton } from '#app/components/ui/status-button.js'
import { useIsPending, withQueryContext } from '#app/utils/misc.js'
import { Prisma } from '@prisma/client'

export const NewFilmSchema = z.object({
	title: z.string(),
	overview: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: NewFilmSchema,
	})

	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { title, overview } = submission.value

	await prisma.film.create(
		withQueryContext(
			{
				data: {
					title,
					overview,
				},
			},
			{ userId, modelId: '' },
		),
	)

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Created new film',
				type: 'success',
			}),
		},
	)
}

export default function DashboardFilmsPage() {
	const data = useActionData<typeof action>()
	const isPending = useIsPending()

	const [form, fields] = useForm({
		id: 'reset-password',
		constraint: getZodConstraint(NewFilmSchema),
		lastResult: data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: NewFilmSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<div>
			<Form method="POST" {...getFormProps(form)}>
				<Field
					labelProps={{
						htmlFor: fields.title.id,
						children: 'Title',
					}}
					inputProps={{
						...getInputProps(fields.title, { type: 'text' }),
						autoFocus: true,
					}}
					errors={fields.title.errors}
				/>
				<Field
					labelProps={{
						htmlFor: fields.overview.id,
						children: 'Overview',
					}}
					inputProps={{
						...getInputProps(fields.overview, { type: 'text' }),
						autoFocus: true,
					}}
					errors={fields.overview.errors}
				/>
				<ErrorList errors={form.errors} id={form.errorId} />

				<StatusButton
					className="w-full"
					status={isPending ? 'pending' : (form.status ?? 'idle')}
					type="submit"
					disabled={isPending}
				>
					Create Film
				</StatusButton>
			</Form>
		</div>
	)
}
