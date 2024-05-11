import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { columns } from '#app/components/table/film/crew/columns.tsx'
import { CrewTable } from '#app/components/table/film/crew/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			crew: {
				include: {
					person: true,
				},
			},
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const crew = film.crew.map(crew => ({
		id: crew.id,
		name: crew.person.name,
		department: crew.department,
		job: crew.job,
		featured: crew.featured,
	}))
	return json({ crew })
}

export default function FilmEditCrewRoute() {
	const { crew } = useLoaderData<typeof loader>()

	return <CrewTable data={crew} columns={columns} />
}
