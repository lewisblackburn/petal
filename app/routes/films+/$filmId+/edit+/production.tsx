import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { z } from 'zod'
import { ErrorList, MultiSelectField } from '#app/components/forms.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { COUNTRIES } from '#app/utils/constants.ts'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'
import { redirectWithToast } from '#app/utils/toast.server.ts'

const FilmProductionCountriesSchema = z.object({
	id: z.string(),
	productionCountries: z.string().optional(),
	// TODO: Can it not work like this instead?
	// productionCountries: z.array(
	// 	z.object({
	// 		countryCode: z.string(),
	// 	}),
	// ),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)

	const formData = await request.formData()

	const submission = await parse(formData, {
		schema: FilmProductionCountriesSchema.superRefine(async (data, ctx) => {
			if (!data.id) return

			const film = await prisma.film.findUnique({
				select: {
					id: true,
				},
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

	// TODO: Fix type
	const productionCountriesJSON: any = JSON.parse(
		submission.value.productionCountries ?? '',
	)

	const updatedFilm = await prisma.film.update({
		select: { id: true },
		where: { id: submission.value.id },
		data: {
			productionCountries: {
				connect: [...productionCountriesJSON],
			},
		},
	})

	return redirectWithToast(`/films/${updatedFilm.id}`, {
		type: 'success',
		title: 'Success',
		description: 'The film has been updated.',
	})
}

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			id: true,
			productionCountries: {
				select: {
					code: true,
					name: true,
					flag: true,
				},
			},
			productionCompanies: {
				select: {
					id: true,
					name: true,
					logo: true,
					countryCode: true,
					createdAt: true,
					updatedAt: true,
				},
			},
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const productionCountries = film.productionCountries.map(country => ({
		countryCode: country.code,
		name: country.name,
		flag: country.flag,
	}))

	const productionCompanies = film.productionCompanies.map(company => ({
		id: company.id,
		name: company.name,
		logo: company.logo,
		created: new Date(company.createdAt),
		updated: new Date(company.updatedAt),
	}))

	return json({ film, productionCountries, productionCompanies })
}

export default function FilmEditProductionInformationRoute() {
	const data = useLoaderData<typeof loader>()

	const filmFetcher = useFetcher<typeof action>()
	const isPending = filmFetcher.state !== 'idle'

	const [form, fields] = useForm({
		id: 'production-countries-form',
		constraint: getFieldsetConstraint(FilmProductionCountriesSchema),
		lastSubmission: filmFetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: FilmProductionCountriesSchema })
		},
		defaultValue: {
			productionCountries: data.productionCountries,
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
				<MultiSelectField
					labelProps={{
						htmlFor: fields.productionCountries.id,
						children: 'Production Countries',
						autoFocus: true,
					}}
					buttonProps={{
						...conform.input(fields.productionCountries, { type: 'text' }),
					}}
					options={COUNTRIES}
					errors={fields.productionCountries.errors}
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
