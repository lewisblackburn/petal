import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { FilmEditor } from '../../__film-editor.tsx'

export { action } from '../../__film-editor.server.tsx'

export async function loader({ params, request }: LoaderFunctionArgs) {
	await requireUserId(request)
	const film = await prisma.film.findFirst({
		select: {
			id: true,
			title: true,
			tagline: true,
			overview: true,
			runtime: true,
			releaseDate: true,
			language: true,
			ageRating: true,
			status: true,
			budget: true,
			revenue: true,
		},
		where: {
			id: params.filmId,
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })
	return json({ film })
}

export default function FilmEditRoute() {
	const data = useLoaderData<typeof loader>()

	return <FilmEditor film={data.film} />
}
