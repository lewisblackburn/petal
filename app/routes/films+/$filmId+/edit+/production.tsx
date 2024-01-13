import { useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			productionInformation: {
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
			},
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const productionCountries = film.productionInformation.map(information =>
		information.productionCountries.map(country => ({
			countryCode: country.code,
			name: country.name,
			flag: country.flag,
		})),
	)

	const productionCompanies = film.productionInformation.map(information =>
		information.productionCompanies.map(company => ({
			id: company.id,
			name: company.name,
			logo: company.logo,
			created: new Date(company.createdAt),
			updated: new Date(company.updatedAt),
		})),
	)

	return json({ productionCountries, productionCompanies })
}

export default function FilmEditAlternativeTitlesRoute() {
	const { productionCountries, productionCompanies } =
		useLoaderData<typeof loader>()
	console.log(productionCountries, productionCompanies)

	return <div>input here</div>
}
