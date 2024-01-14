import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import { json} from '@remix-run/server-runtime'
import { z } from 'zod'
import { ErrorList, Field } from '#app/components/forms.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { invariantResponse } from '@epic-web/invariant'

const FilmExternalIDSchema = z.object({
	id: z.string(),
	facebook: z.string().optional(),
	instagram: z.string().optional(),
	twitter: z.string().optional(),
	imdbID: z.string().optional(),
	wikiDataID: z.string().optional(),
	tmdbID: z.string().optional(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)

	const formData = await request.formData()

	const submission = await parse(formData, {
		schema: FilmExternalIDSchema.superRefine(async (data, ctx) => {
			if (!data.id) return

			const film = await prisma.film.findUnique({
				select: { id: true, language: true },
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

	const updatedFilm = await prisma.film.update({
		select: { id: true },
		where: { id: submission.value.id },
		data: {
			// remove id from submission.value so ID doesn't get accidentally updated
			...Object.fromEntries(
				Object.entries(submission.value).filter(([key]) => key !== 'id'),
			),
		},
	})

	return redirectWithToast(`/films/${updatedFilm.id}`, {
		type: 'success',
		title: 'Success',
		description: 'The film has been updated.',
	})
}

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			id: true,
			facebook: true,
			instagram: true,
			twitter: true,
			imdbID: true,
			wikiDataID: true,
			tmdbID: true,
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	return json({ film })
}

export default function FilmEditExternalRoute() {
	const data = useLoaderData<typeof loader>()
	const filmFetcher = useFetcher<typeof action>()
	const isPending = filmFetcher.state !== 'idle'

	const [form, fields] = useForm({
		id: 'film-editor',
		constraint: getFieldsetConstraint(FilmExternalIDSchema),
		lastSubmission: filmFetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: FilmExternalIDSchema })
		},
		defaultValue: {
			facebook: data.film.facebook,
			instagram: data.film.instagram,
			twitter: data.film.twitter,
			imdbID: data.film.imdbID,
			wikiDataID: data.film.wikiDataID,
			tmdbID: data.film.tmdbID,
		},
	})

	return (
		<Form
			method="post"
			className="flex h-full flex-col gap-y-4"
			{...form.props}
		>
			{data.film ? (
				<input type="hidden" name="id" value={data.film.id} />
			) : null}
			<div className="flex flex-col gap-1">
				<Field
					labelProps={{ children: 'Facebook' }}
					inputProps={{
						autoFocus: true,
						...conform.input(fields.facebook, { ariaAttributes: true }),
					}}
					errors={fields.facebook.errors}
				/>
				<Field
					labelProps={{ children: 'Instagram' }}
					inputProps={{
						...conform.input(fields.instagram, { ariaAttributes: true }),
					}}
					errors={fields.instagram.errors}
				/>
				<Field
					labelProps={{ children: 'Twitter' }}
					inputProps={{
						...conform.input(fields.twitter, { ariaAttributes: true }),
					}}
					errors={fields.twitter.errors}
				/>
				<Field
					labelProps={{ children: 'IMDB ID' }}
					inputProps={{
						...conform.input(fields.imdbID, { ariaAttributes: true }),
					}}
					errors={fields.imdbID.errors}
				/>
				<Field
					labelProps={{ children: 'Wikidata ID' }}
					inputProps={{
						...conform.input(fields.wikiDataID, { ariaAttributes: true }),
					}}
					errors={fields.wikiDataID.errors}
				/>
				<Field
					labelProps={{ children: 'TMDB ID' }}
					inputProps={{
						...conform.input(fields.tmdbID, { ariaAttributes: true }),
					}}
					errors={fields.tmdbID.errors}
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
