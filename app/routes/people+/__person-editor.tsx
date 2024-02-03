import { getInputProps, getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type Person } from '@prisma/client'
import { Form, useFetcher } from '@remix-run/react'
import {
	type ActionFunctionArgs,
	json,
	type SerializeFrom,
} from '@remix-run/server-runtime'
import { format } from 'date-fns'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import {
	ErrorList,
	Field,
	FilterSelectField,
	SelectField,
	TextareaField,
} from '#app/components/forms.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { GENDERS, ROLES } from '#app/utils/constants.ts'
import { prisma } from '#app/utils/db.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'

const PersonEditorSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1).max(50),
	knownForDepartment: z.string().optional(),
	biography: z.string().optional(),
	birthdate: z.date().optional(),
	dayOfDeath: z.date().optional(),
	gender: z.enum(['male', 'female', 'other']).optional(),
	placeOfBirth: z.string().optional(),
	homepage: z.string().optional(),
})

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

export function PersonEditor({
	person,
}: {
	person?: SerializeFrom<
		Pick<
			Person,
			| 'id'
			| 'name'
			| 'knownForDepartment'
			| 'biography'
			| 'birthdate'
			| 'dayOfDeath'
			| 'gender'
			| 'placeOfBirth'
			| 'homepage'
		>
	>
}) {
	const personFetcher = useFetcher<typeof action>()
	const isPending = personFetcher.state !== 'idle'

	const [form, fields] = useForm({
		id: 'person-editor',
		constraint: getZodConstraint(PersonEditorSchema),
		lastResult: personFetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: PersonEditorSchema })
		},
		defaultValue: {
			...person,
			birthdate: person?.birthdate
				? format(new Date(person.birthdate), 'yyyy-MM-dd')
				: null,
			dayOfDeath: person?.dayOfDeath
				? format(new Date(person.dayOfDeath), 'yyyy-MM-dd')
				: null,
		},
	})

	return (
		<Form
			method="post"
			className="flex h-full flex-col gap-y-4"
			{...getFormProps(form)}
			encType="multipart/form-data"
		>
			{person ? <input type="hidden" name="id" value={person.id} /> : null}
			<div className="flex flex-col gap-1">
				<FilterSelectField
					labelProps={{
						htmlFor: fields.knownForDepartment.id,
						children: 'Known For',
					}}
					buttonProps={{
						...getInputProps(fields.knownForDepartment, { type: 'text' }),
					}}
					options={ROLES.map(role => ({
						label: role.department,
						value: role.department,
					}))}
					errors={fields.knownForDepartment.errors}
				/>
				<Field
					labelProps={{ children: 'Name' }}
					inputProps={{
						autoFocus: true,
						...getInputProps(fields.name, {
							ariaAttributes: true,
							type: 'text',
						}),
					}}
					errors={fields.name.errors}
				/>
				<TextareaField
					labelProps={{ htmlFor: fields.biography.id, children: 'Biography' }}
					textareaProps={{
						...getInputProps(fields.biography, { type: 'text' }),
						autoComplete: 'biography',
					}}
					className="w-full"
					errors={fields.biography.errors}
				/>
				<Field
					labelProps={{ htmlFor: fields.birthdate.id, children: 'Birthdate' }}
					inputProps={{
						...getInputProps(fields.birthdate, { type: 'text' }),
						autoComplete: 'birthdate',
						type: 'date',
					}}
					className="w-full"
					errors={fields.birthdate.errors}
				/>
				<Field
					labelProps={{
						htmlFor: fields.dayOfDeath.id,
						children: 'Day of Death',
					}}
					inputProps={{
						...getInputProps(fields.dayOfDeath, { type: 'text' }),
						autoComplete: 'dayOfDeath',
						type: 'date',
					}}
					className="w-full"
					errors={fields.dayOfDeath.errors}
				/>
				<SelectField
					labelProps={{ htmlFor: fields.gender.id, children: 'Gender' }}
					buttonProps={{
						...getInputProps(fields.gender, { type: 'text' }),
					}}
					options={GENDERS}
					className="w-full"
					errors={fields.gender.errors}
				/>
			</div>
			<ErrorList id={form.errorId} errors={form.errors} />
			<div className="flex justify-end gap-2">
				<Button form={form.id} variant="destructive" type="reset">
					Reset
				</Button>
				<StatusButton
					form={form.id}
					type="submit"
					disabled={isPending}
					status={isPending ? 'pending' : 'idle'}
				>
					Submit
				</StatusButton>
			</div>
		</Form>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No person with the id "{params.personId}" exists</p>
				),
			}}
		/>
	)
}
