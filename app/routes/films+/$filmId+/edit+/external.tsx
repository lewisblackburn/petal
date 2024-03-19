import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { InputConform } from '#app/components/form/conform/Input.js'
import { Field, FieldError } from '#app/components/form/Field.js'
import { Button } from '#app/components/ui/button.tsx'
import { Label } from '#app/components/ui/label.js'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'

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

	const submission = await parseWithZod(formData, {
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

	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
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
		constraint: getZodConstraint(FilmExternalIDSchema),
		lastResult: filmFetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: FilmExternalIDSchema })
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
			{...getFormProps(form)}
		>
			{data.film ? (
				<input type="hidden" name="id" value={data.film.id} />
			) : null}
			<div className="flex flex-col gap-1">
				<Field>
					<Label htmlFor={fields.facebook.id}>Facebook</Label>
					<InputConform meta={fields.facebook} type="text" />
					{fields.facebook.errors && (
						<FieldError>{fields.facebook.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.instagram.id}>Instagram</Label>
					<InputConform meta={fields.instagram} type="text" />
					{fields.instagram.errors && (
						<FieldError>{fields.instagram.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.twitter.id}>Twitter</Label>
					<InputConform meta={fields.twitter} type="text" />
					{fields.twitter.errors && (
						<FieldError>{fields.twitter.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.imdbID.id}>IMDB ID</Label>
					<InputConform meta={fields.imdbID} type="text" />
					{fields.imdbID.errors && (
						<FieldError>{fields.imdbID.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.wikiDataID.id}>WikiData ID</Label>
					<InputConform meta={fields.wikiDataID} type="text" />
					{fields.wikiDataID.errors && (
						<FieldError>{fields.wikiDataID.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.tmdbID.id}>TMDB ID</Label>
					<InputConform meta={fields.tmdbID} type="text" />
					{fields.tmdbID.errors && (
						<FieldError>{fields.tmdbID.errors}</FieldError>
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
