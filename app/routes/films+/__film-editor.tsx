import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { type Film } from '@prisma/client'
import { Form, useFetcher } from '@remix-run/react'
import {
	type DataFunctionArgs,
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
import { AGE_RATINGS, LANGUAGES, STATUSES } from '#app/utils/constants.ts'
import { prisma } from '#app/utils/db.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'

const FilmEditorSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1).max(50),
	tagline: z.string().max(100).optional(),
	overview: z.string().min(1).max(1000),
	runtime: z.number().min(1).max(500).optional(),
	releaseDate: z.date().optional(),
	ageRating: z.string().optional(),
	language: z.string().optional(),
	status: z.string().optional(),
	budget: z.number().positive().optional(),
	revenue: z.number().positive().optional(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)

	const formData = await request.formData()

	const submission = await parse(formData, {
		schema: FilmEditorSchema.superRefine(async (data, ctx) => {
			if (!data.id) return

			const film = await prisma.film.findUnique({
				select: { id: true },
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

	if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}

	if (!submission.value) {
		return json({ status: 'error', submission } as const, { status: 400 })
	}

	const {
		id: filmId,
		title,
		tagline,
		overview,
		runtime,
		releaseDate,
		ageRating,
		language,
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
				ageRating,
				language,
				status,
				budget,
				revenue,
			},
			update: {
				title,
				tagline,
				overview,
				runtime,
				releaseDate,
				ageRating,
				language,
				status,
				budget,
				revenue,
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
			| 'ageRating'
			| 'language'
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
		constraint: getFieldsetConstraint(FilmEditorSchema),
		lastSubmission: filmFetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: FilmEditorSchema })
		},
		defaultValue: {
			title: film?.title,
			tagline: film?.tagline,
			overview: film?.overview,
			runtime: film?.runtime,
			releaseDate: film?.releaseDate
				? format(new Date(film.releaseDate), 'yyyy-MM-dd')
				: null,
			ageRating: film?.ageRating,
			language: film?.language,
			status: film?.status,
			budget: film?.budget,
			revenue: film?.revenue,
		},
	})

	return (
		<Form
			method="post"
			className="flex h-full flex-col gap-y-4"
			{...form.props}
		>
			{film ? <input type="hidden" name="id" value={film.id} /> : null}
			<div className="flex flex-col gap-1">
				<Field
					labelProps={{ children: 'Title' }}
					inputProps={{
						autoFocus: true,
						...conform.input(fields.title, { ariaAttributes: true }),
					}}
					errors={fields.title.errors}
				/>
				<Field
					labelProps={{ children: 'Tagline' }}
					inputProps={{
						...conform.input(fields.tagline, { ariaAttributes: true }),
					}}
					errors={fields.tagline.errors}
				/>
				<TextareaField
					labelProps={{ children: 'Overview' }}
					textareaProps={{
						...conform.textarea(fields.overview, { ariaAttributes: true }),
					}}
					errors={fields.overview.errors}
				/>
				<Field
					labelProps={{ children: 'Runtime' }}
					inputProps={{
						type: 'number',
						...conform.input(fields.runtime, { ariaAttributes: true }),
					}}
					errors={fields.runtime.errors}
				/>
				<Field
					labelProps={{ children: 'Release Date' }}
					inputProps={{
						type: 'date',
						...conform.input(fields.releaseDate, { ariaAttributes: true }),
					}}
					errors={fields.releaseDate.errors}
				/>
				<SelectField
					labelProps={{ children: 'Age Rating' }}
					buttonProps={{
						...conform.input(fields.ageRating, { ariaAttributes: true }),
					}}
					options={AGE_RATINGS}
					errors={fields.ageRating.errors}
				/>
				<FilterSelectField
					labelProps={{ children: 'Language' }}
					buttonProps={{
						...conform.input(fields.language, { ariaAttributes: true }),
					}}
					options={LANGUAGES}
					errors={fields.language.errors}
				/>
				<SelectField
					labelProps={{ children: 'Status' }}
					buttonProps={{
						...conform.input(fields.status, { ariaAttributes: true }),
					}}
					options={STATUSES}
					errors={fields.status.errors}
				/>
				<Field
					labelProps={{ children: 'Budget' }}
					inputProps={{
						type: 'number',
						...conform.input(fields.budget, { ariaAttributes: true }),
					}}
					errors={fields.budget.errors}
				/>
				<Field
					labelProps={{ children: 'Revenue' }}
					inputProps={{
						type: 'number',
						...conform.input(fields.revenue, { ariaAttributes: true }),
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
