import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { useFetcher, useSearchParams } from '@remix-run/react'
import { z } from 'zod'
import { prisma } from '~/utils/db.server.ts'
import { type Person } from '@prisma/client'
import {
	ErrorList,
	Field,
	SearchSelectField,
	SelectField,
	TextareaField,
} from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import { StatusButton } from '~/components/ui/status-button.tsx'
import { GENDERS, crewRolesWithActing } from '~/utils/constants.ts'
import { safeRedirect } from 'remix-utils'
import { LocationSearch } from './locations.tsx'

export const PersonEditorSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1),
	knownForDepartment: z.string().min(1),
	biography: z.string().optional(),
	birthdate: z.string().optional(),
	dayOfDeath: z.string().optional(),
	gender: z.string().min(1),
	placeOfBirth: z.string(),
	homepage: z.string().optional(),
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

	const {
		id,
		name,
		knownForDepartment,
		biography,
		birthdate,
		dayOfDeath,
		gender,
		placeOfBirth,
		homepage,
		redirectTo,
	} = submission.value

	const data = {
		name,
		knownForDepartment,
		biography,
		birthdate: birthdate ? new Date(birthdate) : null,
		dayOfDeath: dayOfDeath ? new Date(dayOfDeath) : null,
		gender,
		placeOfBirth,
		homepage,
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
		person = await prisma.person.create({
			data: {
				...data,
				photos: {
					create: {
						image: 'https://via.placeholder.com/300x450',
						primary: true,
					},
				},
			},
			select,
		})
	}

	return redirect(safeRedirect(redirectTo, `/people/${person.id}`))
}

export function PersonEditor({
	person,
}: {
	person?: Partial<Omit<Person, 'birthdate' | 'dayOfDeath'>> & {
		birthdate: string | null
		dayOfDeath: string | null
	}
}) {
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
			<div className="flex items-center gap-5">
				<SearchSelectField
					labelProps={{
						htmlFor: fields.knownForDepartment.id,
						children: 'Known For',
					}}
					buttonProps={{
						...conform.input(fields.knownForDepartment),
					}}
					options={crewRolesWithActing()}
					errors={fields.knownForDepartment.errors}
				/>
				<Field
					labelProps={{ htmlFor: fields.name.id, children: 'Name' }}
					inputProps={{
						...conform.input(fields.name),
						autoComplete: 'name',
					}}
					className="w-full"
					errors={fields.name.errors}
				/>
			</div>
			<TextareaField
				labelProps={{ htmlFor: fields.biography.id, children: 'Biography' }}
				textareaProps={{
					...conform.input(fields.biography),
					autoComplete: 'biography',
				}}
				className="w-full"
				errors={fields.biography.errors}
			/>
			<div className="flex items-center gap-5">
				<Field
					labelProps={{ htmlFor: fields.birthdate.id, children: 'Birthdate' }}
					inputProps={{
						...conform.input(fields.birthdate),
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
						...conform.input(fields.dayOfDeath),
						autoComplete: 'dayOfDeath',
						type: 'date',
					}}
					className="w-full"
					errors={fields.dayOfDeath.errors}
				/>
				<SelectField
					labelProps={{ htmlFor: fields.gender.id, children: 'Gender' }}
					buttonProps={{
						...conform.input(fields.gender),
					}}
					options={GENDERS}
					className="w-full"
					errors={fields.gender.errors}
				/>
			</div>
			<LocationSearch
				labelProps={{
					htmlFor: fields.placeOfBirth.id,
					children: 'Place of Birth',
				}}
				buttonProps={{
					...conform.input(fields.placeOfBirth),
				}}
				errors={fields.placeOfBirth.errors}
			/>
			<Field
				labelProps={{
					htmlFor: fields.homepage.id,
					children: 'Homepage',
				}}
				inputProps={{
					...conform.input(fields.homepage),
					autoComplete: 'homepage',
				}}
				className="w-full"
				errors={fields.homepage.errors}
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
