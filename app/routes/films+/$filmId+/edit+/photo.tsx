import { useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/photos/columns.tsx'
import { PhotoTable } from '#app/components/table/film/photos/data-table.tsx'
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
			photos: true,
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const photos = film.photos.map(photo => ({
		id: photo.id,
		image: photo.image,
		type: photo.type,
		language: photo.language,
		primary: photo.primary,
	}))

	return json({ photos })
}

export default function FilmEditphotos() {
	const { photos } = useLoaderData<typeof loader>()

	return (
		<div className="container py-6">
			{/* FIX: Dropdown resetting scroll */}
			<PhotoTable data={photos} columns={columns} />
		</div>
	)
}
