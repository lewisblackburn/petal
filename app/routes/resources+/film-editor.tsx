import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { z } from 'zod'
import { prisma } from '~/utils/db.server.ts'
import { type Film } from '@prisma/client'
import { ErrorList, Field, TextareaField } from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import { StatusButton } from '~/components/ui/status-button.tsx'
import { Container } from '~/components/container.tsx'

export const FilmEditorSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1),
	// The tagline is optional, but if filled, it needs to satisfy the minimum character requirement
	tagline: z.string().min(8).max(100).or(z.string().max(0)),
	overview: z.string().min(1),
	releaseDate: z.string().optional(),
	runtime: z.string().optional(),
	budget: z.string().optional(),
	revenue: z.string().optional(),
	status: z.string().optional(),
	instagram: z.string().optional(),
	twitter: z.string().optional(),
	website: z.string().optional(),
	tmdbId: z.string().optional(),
})

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: FilmEditorSchema,
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
	let film: { id: string }

	const {
		title,
		tagline,
		overview,
		releaseDate,
		runtime,
		budget,
		revenue,
		status,
		instagram,
		twitter,
		website,
		tmdbId,
		id,
	} = submission.value

	const data = {
		title: title,
		tagline: tagline,
		overview: overview,
		releaseDate: releaseDate ? new Date(releaseDate) : null, // Convert to Date object if not empty
		runtime: runtime ? parseInt(runtime.toString(), 10) : null,
		budget: budget ? parseInt(budget.toString(), 10) : null,
		revenue: revenue ? parseInt(revenue.toString(), 10) : null,
		status: status,
		instagram: instagram,
		twitter: twitter,
		website: website,
		tmdbId: tmdbId,
	}

	const select = {
		id: true,
	}
	if (id) {
		const existingFilm = await prisma.film.findFirst({
			where: { id },
			select: { id: true },
		})
		if (!existingFilm) {
			return json({ status: 'error', submission } as const, { status: 400 })
		}
		film = await prisma.film.update({
			where: { id },
			data,
			select,
		})
	} else {
		film = await prisma.film.create({ data, select })
	}
	return redirect(`/films/${film.id}`)
}

export function FilmEditor({
	film,
}: {
	film?: Partial<Omit<Film, 'releaseDate'>> & { releaseDate: string | null }
}) {
	const filmEditorFetcher = useFetcher<typeof action>()

	const [form, fields] = useForm({
		id: 'film-editor',
		constraint: getFieldsetConstraint(FilmEditorSchema),
		lastSubmission: filmEditorFetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: FilmEditorSchema })
		},
		defaultValue: film,
		shouldRevalidate: 'onBlur',
	})

	return (
		<div>
			<Container>
				<filmEditorFetcher.Form
					method="post"
					action="/resources/film-editor"
					{...form.props}
				>
					<input name="id" type="hidden" value={film?.id} />
					<div className="grid grid-cols-6 gap-x-10">
						<Field
							className="col-span-3"
							labelProps={{ htmlFor: fields.title.id, children: 'Title' }}
							inputProps={{
								...conform.input(fields.title),
								autoComplete: 'title',
							}}
							errors={fields.title.errors}
						/>
						<Field
							className="col-span-3"
							labelProps={{ htmlFor: fields.tagline.id, children: 'Tagline' }}
							inputProps={{
								...conform.input(fields.tagline),
								autoComplete: 'tagline',
							}}
							errors={fields.tagline.errors}
						/>
					</div>
					<TextareaField
						labelProps={{ htmlFor: fields.overview.id, children: 'Overview' }}
						textareaProps={{
							...conform.textarea(fields.overview),
							autoComplete: 'overview',
						}}
						errors={fields.overview.errors}
					/>
					<Field
						labelProps={{
							htmlFor: fields.releaseDate.id,
							children: 'Release Date',
						}}
						inputProps={{
							...conform.input(fields.releaseDate),
							autoComplete: 'releaseDate',
							type: 'date',
						}}
						errors={fields.releaseDate.errors}
					/>
					<Field
						labelProps={{ htmlFor: fields.runtime.id, children: 'Runtime' }}
						inputProps={{
							...conform.input(fields.runtime),
							autoComplete: 'runtime',
							type: 'number',
						}}
						errors={fields.runtime.errors}
					/>
					<Field
						labelProps={{ htmlFor: fields.budget.id, children: 'Budget' }}
						inputProps={{
							...conform.input(fields.budget),
							autoComplete: 'budget',
							type: 'number',
						}}
						errors={fields.runtime.errors}
					/>
					<Field
						labelProps={{ htmlFor: fields.revenue.id, children: 'Revenue' }}
						inputProps={{
							...conform.input(fields.revenue),
							autoComplete: 'revenue',
							type: 'number',
						}}
						errors={fields.runtime.errors}
					/>
					<Field
						labelProps={{ htmlFor: fields.instagram.id, children: 'Instagram' }}
						inputProps={{
							...conform.input(fields.instagram),
							autoComplete: 'instagram',
						}}
						errors={fields.instagram.errors}
					/>
					<Field
						labelProps={{ htmlFor: fields.twitter.id, children: 'Twitter' }}
						inputProps={{
							...conform.input(fields.twitter),
							autoComplete: 'twitter',
						}}
						errors={fields.twitter.errors}
					/>
					<Field
						labelProps={{ htmlFor: fields.website.id, children: 'Website' }}
						inputProps={{
							...conform.input(fields.website),
							autoComplete: 'website',
						}}
						errors={fields.website.errors}
					/>
					<Field
						labelProps={{ htmlFor: fields.tmdbId.id, children: 'TMDBID' }}
						inputProps={{
							...conform.input(fields.tmdbId),
							autoComplete: 'tmdbId',
						}}
						errors={fields.tmdbId.errors}
					/>
					<ErrorList errors={form.errors} id={form.errorId} />
					<div className="flex justify-end gap-4">
						<Button variant="outline" type="reset">
							Reset
						</Button>
						<StatusButton
							status={
								filmEditorFetcher.state === 'submitting'
									? 'pending'
									: filmEditorFetcher.data?.status ?? 'idle'
							}
							type="submit"
							disabled={filmEditorFetcher.state !== 'idle'}
						>
							Submit
						</StatusButton>
					</div>
				</filmEditorFetcher.Form>
			</Container>
		</div>
	)
}
