import { useLoaderData } from '@remix-run/react'
import { json} from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/photo/columns.tsx'
import { PhotoTable } from '#app/components/table/film/photo/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { LoaderFunctionArgs } from '@remix-run/node'
import { invariantResponse } from '@epic-web/invariant'

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			photos: true,
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const photos = film.photos.map(photo => ({
		id: photo.id,
		image: photo.image,
		type: photo.type,
		language: photo.language,
	}))

	return json({ photos })
}

export default function FilmEditPhotoRoute() {
	const { photos } = useLoaderData<typeof loader>()

	// FIX: Dropdown resetting scroll
	return <PhotoTable data={photos} columns={columns} />
}
