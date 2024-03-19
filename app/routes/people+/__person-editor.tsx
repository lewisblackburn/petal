import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type Person } from '@prisma/client'
import { Form, useFetcher } from '@remix-run/react'
import { type SerializeFrom } from '@remix-run/server-runtime'
import { format } from 'date-fns'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'

import { DatePickerConform } from '#app/components/form/conform/DatePicker.js'
import { DepartmentPickerConform } from '#app/components/form/conform/DepartmentPicker.js'
import { InputConform } from '#app/components/form/conform/Input.js'
import { SelectConform } from '#app/components/form/conform/Select.js'
import { TextareaConform } from '#app/components/form/conform/Textarea.js'
import { Field, FieldError } from '#app/components/form/Field.js'
import { Button } from '#app/components/ui/button.tsx'
import { Label } from '#app/components/ui/label.js'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { GENDERS } from '#app/utils/constants.ts'
import { type action } from './__person-editor.server'

export const PersonEditorSchema = z.object({
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
				<Field>
					<Label htmlFor={fields.knownForDepartment.id}>
						Known for department
					</Label>
					<DepartmentPickerConform meta={fields.knownForDepartment} />
					{fields.knownForDepartment.errors && (
						<FieldError>{fields.knownForDepartment.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.name.id}>Name</Label>
					<InputConform meta={fields.name} type="text" />
					{fields.name.errors && <FieldError>{fields.name.errors}</FieldError>}
				</Field>
				<Field>
					<Label htmlFor={fields.biography.id}>Biography</Label>
					<TextareaConform meta={fields.biography} />
					{fields.biography.errors && (
						<FieldError>{fields.biography.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.birthdate.id}>Birth date</Label>
					<DatePickerConform meta={fields.birthdate} />
					{fields.birthdate.errors && (
						<FieldError>{fields.birthdate.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.dayOfDeath.id}>Day of death</Label>
					<DatePickerConform meta={fields.dayOfDeath} />
					{fields.dayOfDeath.errors && (
						<FieldError>{fields.dayOfDeath.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.gender.id}>Gender</Label>
					<SelectConform
						placeholder="Select a gender"
						meta={fields.gender}
						items={GENDERS.map(gender => ({
							name: gender.label,
							value: gender.value,
						}))}
					/>
					{fields.gender.errors && (
						<FieldError>{fields.gender.errors}</FieldError>
					)}
				</Field>
			</div>
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
