import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type Film } from '@prisma/client'
import { Form, useFetcher } from '@remix-run/react'
import { type SerializeFrom } from '@remix-run/server-runtime'
import { format } from 'date-fns'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { DatePickerConform } from '#app/components/form/conform/DatePicker.js'
import { InputConform } from '#app/components/form/conform/Input.js'
import { LanguagePickerConform } from '#app/components/form/conform/LanguagePicker.js'
import { SelectConform } from '#app/components/form/conform/Select.js'
import { TextareaConform } from '#app/components/form/conform/Textarea.js'
import { Field, FieldError } from '#app/components/form/Field.js'
import { Button } from '#app/components/ui/button.tsx'
import { Label } from '#app/components/ui/label.js'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { AGE_RATINGS, LANGUAGES, STATUSES } from '#app/utils/constants.ts'
import { type action } from './__film-editor.server'

export const FilmEditorSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1).max(50),
	tagline: z.string().max(100).optional(),
	overview: z.string().min(1).max(1000),
	runtime: z.number().min(1).max(500).nullable(),
	releaseDate: z.date().optional(),
	language: z
		.enum(LANGUAGES.map(language => language.name) as [string, ...string[]])
		.optional(),
	ageRating: z
		.enum(AGE_RATINGS.map(rating => rating.value) as [string, ...string[]])
		.optional(),
	status: z
		.enum(STATUSES.map(status => status.name) as [string, ...string[]])
		.optional(),
	budget: z.number().positive().optional(),
	revenue: z.number().positive().optional(),
})

export function FilmEditor({
	film,
}: {
	film?: SerializeFrom<
		Pick<
			Film,
			| 'id'
			| 'title'
			| 'tagline'
			| 'overview'
			| 'runtime'
			| 'releaseDate'
			| 'language'
			| 'ageRating'
			| 'status'
			| 'budget'
			| 'revenue'
		>
	>
}) {
	const filmFetcher = useFetcher<typeof action>()
	const isPending = filmFetcher.state !== 'idle'

	const [form, fields] = useForm({
		id: 'film-editor',
		constraint: getZodConstraint(FilmEditorSchema),
		lastResult: filmFetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: FilmEditorSchema })
		},
		defaultValue: {
			title: film?.title,
			tagline: film?.tagline,
			overview: film?.overview,
			runtime: film?.runtime,
			releaseDate: film?.releaseDate
				? format(new Date(film.releaseDate), 'yyyy-MM-dd')
				: null,
			language: film?.language,
			ageRating: film?.ageRating,
			status: film?.status,
			budget: film?.budget,
			revenue: film?.revenue,
		},
	})

	return (
		<Form
			method="post"
			className="flex h-full flex-col gap-y-4"
			{...getFormProps(form)}
		>
			{film ? <input type="hidden" name="id" value={film.id} /> : null}
			<div className="flex flex-col gap-1">
				<Field>
					<Label htmlFor={fields.title.id}>Title</Label>
					<InputConform meta={fields.title} type="text" autoFocus />
					{fields.title.errors && (
						<FieldError>{fields.title.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.tagline.id}>Tagline</Label>
					<InputConform meta={fields.tagline} type="text" />
					{fields.tagline.errors && (
						<FieldError>{fields.tagline.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.overview.id}>Overview</Label>
					<TextareaConform meta={fields.overview} />
					{fields.overview.errors && (
						<FieldError>{fields.overview.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.runtime.id}>Runtime</Label>
					{/* @ts-expect-error runtime is a number */}
					<InputConform meta={fields.runtime} type="number" />
					{fields.runtime.errors && (
						<FieldError>{fields.runtime.errors}</FieldError>
					)}
				</Field>
				<div className="grid grid-cols-4 justify-between">
					<Field>
						<Label htmlFor={fields.releaseDate.id}>Release date</Label>
						<DatePickerConform meta={fields.releaseDate} />
						{fields.releaseDate.errors && (
							<FieldError>{fields.releaseDate.errors}</FieldError>
						)}
					</Field>
					<Field>
						<Label htmlFor={fields.language.id}>Language</Label>
						<LanguagePickerConform meta={fields.language} />
						{fields.language.errors && (
							<FieldError>{fields.language.errors}</FieldError>
						)}
					</Field>
					<Field>
						<Label htmlFor={fields.ageRating.id}>Age rating</Label>
						<SelectConform
							placeholder="Select an age rating"
							meta={fields.ageRating}
							items={AGE_RATINGS.map(ageRating => ({
								name: ageRating.label,
								value: ageRating.value,
							}))}
						/>
						{fields.ageRating.errors && (
							<FieldError>{fields.ageRating.errors}</FieldError>
						)}
					</Field>
					<Field>
						<Label htmlFor={fields.status.id}>Status</Label>
						<SelectConform
							placeholder="Select a status"
							meta={fields.status}
							items={STATUSES.map(status => ({
								name: status.name,
								value: status.name,
							}))}
						/>
						{fields.status.errors && (
							<FieldError>{fields.status.errors}</FieldError>
						)}
					</Field>
				</div>
				<Field>
					<Label htmlFor={fields.budget.id}>Budget</Label>
					<InputConform meta={fields.budget} type="number" />
					{fields.budget.errors && (
						<FieldError>{fields.budget.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.revenue.id}>Revenue</Label>
					<InputConform meta={fields.revenue} type="number" />
					{fields.revenue.errors && (
						<FieldError>{fields.revenue.errors}</FieldError>
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
					<p>No film with the id "{params.filmId}" exists</p>
				),
			}}
		/>
	)
}
