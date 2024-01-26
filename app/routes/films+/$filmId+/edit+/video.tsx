import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/video/columns.tsx'
import { VideoTable } from '#app/components/table/film/video/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request, params }: LoaderFunctionArgs) {
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
		id: video.id,
		url: video.url,
		name: video.name,
		site: video.site,
		type: video.type,
		quality: video.quality,
	}))

	return json({ videos })
}

export default function FilmEditVideoRoute() {
	const { videos } = useLoaderData<typeof loader>()

	return <VideoTable data={videos} columns={columns} />
}
