import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { useFetcher, useSearchParams } from '@remix-run/react'
import { z } from 'zod'
import { prisma } from '~/utils/db.server.ts'
import { type Person } from '@prisma/client'
import { ErrorList, Field, SearchSelectField } from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import { StatusButton } from '~/components/ui/status-button.tsx'
import { crewRolesWithActing } from '~/utils/constants.ts'
import { safeRedirect } from 'remix-utils'

export const PersonEditorSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1),
	knownForDepartment: z.string().optional(),
	redirectTo: z.string().optional(),
})

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: PersonEditorSchema,
		acceptMultipleErrors: () => true,
	})
	if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}
	if (!submission.value) {
		return json(
			{
				status: 'error',
				submission,
			} as const,
			{ status: 400 },
		)
	}
	let person: { id: string }

	const { id, name, knownForDepartment, redirectTo } = submission.value

	const data = {
		name,
		knownForDepartment,
	}

	const select = {
		id: true,
	}
	if (id) {
		const existingPerson = await prisma.person.findFirst({
			where: { id },
			select: { id: true },
		})
		if (!existingPerson) {
			return json({ status: 'error', submission } as const, { status: 400 })
		}
		person = await prisma.person.update({
			where: { id },
			data,
			select,
		})
	} else {
		person = await prisma.person.create({ data, select })
	}

	return redirect(safeRedirect(redirectTo, `/people/${person.id}`))
}

export function PersonEditor({ person }: { person?: Partial<Person> }) {
	const [searchParams] = useSearchParams()
	const personEditorFetcher = useFetcher<typeof action>()

	const [form, fields] = useForm({
		id: 'person-editor',
		constraint: getFieldsetConstraint(PersonEditorSchema),
		lastSubmission: personEditorFetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: PersonEditorSchema })
		},
		defaultValue: person,
		shouldRevalidate: 'onBlur',
	})

	const redirectTo = searchParams.get('redirectTo') ?? ''

	return (
		<personEditorFetcher.Form
			method="post"
			action="/resources/person-editor"
			{...form.props}
		>
			<input name="id" type="hidden" value={person?.id} />
			<Field
				labelProps={{ htmlFor: fields.name.id, children: 'Name' }}
				inputProps={{
					...conform.input(fields.name),
					autoComplete: 'name',
				}}
				errors={fields.name.errors}
			/>
			<SearchSelectField
				labelProps={{
					htmlFor: fields.knownForDepartment.id,
					children: 'Department',
				}}
				selectProps={{
					...conform.input(fields.knownForDepartment),
					autoComplete: 'known-for-department',
				}}
				options={crewRolesWithActing()}
				errors={fields.knownForDepartment.errors}
			/>
			<input name={fields.redirectTo.name} type="hidden" value={redirectTo} />
			<ErrorList errors={form.errors} id={form.errorId} />
			<div className="flex justify-end gap-4">
				<Button variant="outline" type="reset">
					Reset
				</Button>
				<StatusButton
					status={
						personEditorFetcher.state === 'submitting'
							? 'pending'
							: personEditorFetcher.data?.status ?? 'idle'
					}
					type="submit"
					disabled={personEditorFetcher.state !== 'idle'}
				>
					Submit
				</StatusButton>
			</div>
		</personEditorFetcher.Form>
	)
}
