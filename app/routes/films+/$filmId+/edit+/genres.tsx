import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/genres/columns.tsx'
import { GenreTable } from '#app/components/table/film/genres/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			genres: true,
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const genres = film.genres.map(genre => ({
		id: genre.id,
		name: genre.name,
		created: new Date(genre.createdAt),
		updated: new Date(genre.updatedAt),
	}))

	return json({ genres })
}

export default function FilmEditGenresRoute() {
	const { genres } = useLoaderData<typeof loader>()

	return <GenreTable data={genres} columns={columns} />
}
