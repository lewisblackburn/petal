import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { columns } from '#app/components/table/film/release/columns.tsx'
import { ReleaseInformationTable } from '#app/components/table/film/release/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			releaseInformation: {
				select: {
					id: true,
					country: true,
					language: true,
					date: true,
					classification: true,
					type: true,
					note: true,
				},
			},
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const releaseInformation = film.releaseInformation.map((release) => ({
		id: release.id,
		country: release.country,
		language: release.language,
		releaseDate: new Date(release.date),
		classification: release.classification,
		type: release.type,
		note: release.note,
	}))

	return json({ releaseInformation })
}

export default function FilmEditTaglinesRoute() {
	const { releaseInformation } = useLoaderData<typeof loader>()

	return <ReleaseInformationTable data={releaseInformation} columns={columns} />
}
