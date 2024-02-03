import { getInputProps, getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { ErrorList, MultiSelectField } from '#app/components/forms.tsx'
import { columns } from '#app/components/table/film/productionCompanies/columns.tsx'
import { ProductionCompaniesTable } from '#app/components/table/film/productionCompanies/data-table.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { COUNTRIES } from '#app/utils/constants.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

const FilmProductionCountriesSchema = z.object({
	id: z.string(),
	productionCountries: z.string(),
	// TODO: Can it not work like this instead?
	// productionCountries: z.array(
	// 	z.object({
	// 		countryCode: z.string(),
	// 	}),
	// ),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)

	const formData = await request.formData()

	const submission = await parseWithZod(formData, {
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

	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	await prisma.film.update({
		select: { id: true },
		where: { id: submission.value.id },
		data: {
			productionCountries: {
				set: submission.value.productionCountries,
			},
		},
	})

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Added Processed Countries',
				type: 'success',
			}),
		},
	)
}

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			id: true,
			productionCountries: true,
			productionCompanies: {
				select: {
					id: true,
					name: true,
					logo: true,
					createdAt: true,
					updatedAt: true,
				},
			},
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const productionCompanies = film.productionCompanies.map(company => ({
		id: company.id,
		company: company.name,
		logo: company.logo,
		created: new Date(company.createdAt),
		updated: new Date(company.updatedAt),
	}))

	return json({ film, productionCompanies })
}

export default function FilmEditProductionInformationRoute() {
	const data = useLoaderData<typeof loader>()

	const filmFetcher = useFetcher<typeof action>()
	const isPending = filmFetcher.state !== 'idle'

	const [form, fields] = useForm({
		id: 'production-countries-form',
		constraint: getZodConstraint(FilmProductionCountriesSchema),
		lastResult: filmFetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: FilmProductionCountriesSchema })
		},
		defaultValue: {
			productionCountries: data.film.productionCountries,
		},
	})

	return (
		<div className="flex flex-col gap-10">
			<Form
				method="post"
				className="flex h-full flex-col gap-y-4"
				{...getFormProps(form)}
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
							...getInputProps(fields.productionCountries, { type: 'text' }),
						}}
						options={COUNTRIES.map(country => ({
							label: country.name,
							value: country.name,
						}))}
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
			<ProductionCompaniesTable
				data={data.productionCompanies}
				columns={columns}
			/>
		</div>
	)
}
