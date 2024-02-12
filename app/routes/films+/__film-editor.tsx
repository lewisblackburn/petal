import { getInputProps, getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type Film } from '@prisma/client'
import { type ActionFunctionArgs } from '@remix-run/node'
import { Form, useFetcher } from '@remix-run/react'
import { json, type SerializeFrom } from '@remix-run/server-runtime'
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
import { requireUserId } from '#app/utils/auth.server'
import { AGE_RATINGS, LANGUAGES, STATUSES } from '#app/utils/constants.ts'
import { prisma } from '#app/utils/db.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'

const FilmEditorSchema = z.object({
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

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	let film: any = null

	const formData = await request.formData()

	const submission = await parseWithZod(formData, {
		schema: FilmEditorSchema.superRefine(async (data, ctx) => {
			if (!data.id) return

			film = await prisma.film.findUnique({
				where: { id: data.id },
			})
			if (!film) {
				ctx.addIssue({
					code: 'custom',
					message: 'Film not found',
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
		id: filmId,
		title,
		tagline,
		overview,
		runtime,
		releaseDate,
		language,
		ageRating,
		status,
		budget,
		revenue,
	} = submission.value

	const updatedFilm = await prisma.$transaction(async $prisma => {
		const film = await $prisma.film.upsert({
			select: { id: true },
			where: { id: filmId ?? '__new_film__' },
			create: {
				title,
				tagline,
				overview,
				runtime,
				releaseDate,
				language,
				ageRating,
				status,
				budget,
				revenue,
				lastUpdatedByUserId: userId,
			},
			update: {
				title,
				tagline,
				overview,
				runtime,
				releaseDate,
				language,
				ageRating,
				status,
				budget,
				revenue,
				lastUpdatedByUserId: userId,
			},
		})

		return film
	})

	return redirectWithToast(`/films/${updatedFilm.id}`, {
		type: 'success',
		title: 'Success',
		description: 'The film has been updated.',
	})
}

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
				<Field
					labelProps={{ children: 'Title' }}
					inputProps={{
						autoFocus: true,
						...getInputProps(fields.title, {
							ariaAttributes: true,
							type: 'text',
						}),
					}}
					errors={fields.title.errors}
				/>
				<Field
					labelProps={{ children: 'Tagline' }}
					inputProps={{
						...getInputProps(fields.tagline, {
							ariaAttributes: true,
							type: 'text',
						}),
					}}
					errors={fields.tagline.errors}
				/>
				<TextareaField
					labelProps={{ children: 'Overview' }}
					textareaProps={{
						...getInputProps(fields.overview, {
							ariaAttributes: true,
							type: 'text',
						}),
					}}
					errors={fields.overview.errors}
				/>
				<Field
					labelProps={{ children: 'Runtime' }}
					inputProps={{
						...getInputProps(fields.runtime, {
							ariaAttributes: true,
							type: 'number',
						}),
					}}
					errors={fields.runtime.errors}
				/>
				<Field
					labelProps={{ children: 'Release Date' }}
					inputProps={{
						...getInputProps(fields.releaseDate, {
							ariaAttributes: true,
							type: 'date',
						}),
					}}
					errors={fields.releaseDate.errors}
				/>
				<FilterSelectField
					labelProps={{
						htmlFor: fields.language.id,
						children: 'Language',
					}}
					buttonProps={{
						...getInputProps(fields.language, { type: 'text' }),
					}}
					options={LANGUAGES.map(language => ({
						label: language.name,
						value: language.name,
					}))}
					errors={fields.language.errors}
				/>
				<SelectField
					labelProps={{ children: 'Age Rating' }}
					buttonProps={{
						...getInputProps(fields.ageRating, {
							ariaAttributes: true,
							type: 'text',
						}),
					}}
					options={AGE_RATINGS}
					errors={fields.ageRating.errors}
				/>
				<SelectField
					labelProps={{ children: 'Status' }}
					buttonProps={{
						...getInputProps(fields.status, {
							ariaAttributes: true,
							type: 'text',
						}),
					}}
					options={STATUSES.map(status => ({
						label: status.name,
						value: status.name,
					}))}
					errors={fields.status.errors}
				/>
				<Field
					labelProps={{ children: 'Budget' }}
					inputProps={{
						...getInputProps(fields.budget, {
							ariaAttributes: true,
							type: 'number',
						}),
					}}
					errors={fields.budget.errors}
				/>
				<Field
					labelProps={{ children: 'Revenue' }}
					inputProps={{
						...getInputProps(fields.revenue, {
							ariaAttributes: true,
							type: 'number',
						}),
					}}
					errors={fields.revenue.errors}
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
					<p>No film with the id "{params.filmId}" exists</p>
				),
			}}
		/>
	)
}
