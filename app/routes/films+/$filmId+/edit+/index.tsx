import { json, type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'
import { FilmEditor, action } from '../../__film-editor.tsx'

export { action }

export async function loader({ params, request }: DataFunctionArgs) {
	await requireUserId(request)
	const film = await prisma.film.findFirst({
		select: {
			id: true,
			title: true,
			tagline: true,
			overview: true,
			runtime: true,
			releaseDate: true,
			ageRating: true,
			language: true,
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

export default function FilmEdit() {
	const data = useLoaderData<typeof loader>()

	return <FilmEditor film={data.film} />
}
