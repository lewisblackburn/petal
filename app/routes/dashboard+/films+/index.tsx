import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { z } from 'zod'
import { InputConform } from '#app/components/form/conform/Input.js'
import { TextareaConform } from '#app/components/form/conform/Textarea.js'
import { ErrorList } from '#app/components/form/ErrorList.js'
import { Field, FieldError } from '#app/components/form/Field.js'
import { Label } from '#app/components/ui/label.js'
import { StatusButton } from '#app/components/ui/status-button.js'
import { requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'
import { useIsPending, withQueryContext } from '#app/utils/misc.js'
import { createToastHeaders } from '#app/utils/toast.server.js'

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
			{ userId, modelId: null },
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
				<Field>
					<Label htmlFor={fields.title.id}>Title</Label>
					<InputConform meta={fields.title} type="text" autoFocus />
					{fields.title.errors && (
						<FieldError>{fields.title.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.overview.id}>Overview</Label>
					<TextareaConform meta={fields.overview} />
					{fields.overview.errors && (
						<FieldError>{fields.overview.errors}</FieldError>
					)}
				</Field>

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
