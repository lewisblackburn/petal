import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/alternativeTitles/columns.tsx'
import { AlternativeTitleTable } from '#app/components/table/film/alternativeTitles/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse } from '@epic-web/invariant'
import { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			alternativeTitles: {
				select: {
					id: true,
					title: true,
					createdAt: true,
					updatedAt: true,
					country: true,
				},
			},
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const alternativeTitles = film.alternativeTitles.map(alternativeTitle => ({
		id: alternativeTitle.id,
		title: alternativeTitle.title,
		countryName: alternativeTitle.country.name,
		flag: alternativeTitle.country.flag,
		created: new Date(alternativeTitle.createdAt),
		updated: new Date(alternativeTitle.updatedAt),
	}))

	return json({ alternativeTitles })
}

export default function FilmEditAlternativeTitlesRoute() {
	const { alternativeTitles } = useLoaderData<typeof loader>()

	// FIX: Dropdown resetting scroll
	return <AlternativeTitleTable data={alternativeTitles} columns={columns} />
}
