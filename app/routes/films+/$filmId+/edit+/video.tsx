import { useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/video/columns.tsx'
import { VideoTable } from '#app/components/table/film/video/data-table.tsx'
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
			videos: true,
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const videos = film.videos.map(video => ({
		url: video.url,
		name: video.name,
		site: video.site,
		type: video.type,
		quality: video.quality,
	}))

	return json({ videos })
}

export default function FilmEditVideos() {
	const { videos } = useLoaderData<typeof loader>()

	return (
		<div className="container py-6">
			{/* FIX: Dropdown resetting scroll */}
			<VideoTable data={videos} columns={columns} />
		</div>
	)
}
