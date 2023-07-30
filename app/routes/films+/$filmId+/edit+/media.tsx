import { useLoaderData } from '@remix-run/react'
import {
	type DataFunctionArgs,
	type HeadersFunction,
	json,
} from '@remix-run/server-runtime'
import { Container } from '~/components/container.tsx'
import { columns } from '~/components/table/videos/columns.tsx'
import { VideoTable } from '~/components/table/videos/data-table.tsx'
import { Separator } from '~/components/ui/separator.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)
	const timings = makeTimings('media loader')

	const film = await time(
		() =>
			prisma.film.findUnique({
				where: {
					id: params.filmId,
				},
				select: {
					poster: true,
					backdrop: true,
					videos: true,
				},
			}),
		{ timings, type: 'find media' },
	)

	if (!film) {
		throw new Response('Not found', { status: 404 })
	}

	const videos = film.videos.map(video => ({
		id: video.id,
		name: video.name,
		site: video.site,
		type: video.type,
		quality: video.quality,
	}))

	return json({ videos }, { headers: { 'Server-Timing': timings.toString() } })
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export default function FilmEditMedia() {
	const { videos } = useLoaderData<typeof loader>()

	return (
		<Container>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Photos</h3>
					<p className="text-sm text-muted-foreground">
						The photos for the film.
					</p>
				</div>
				<Separator />
				<div>
					<h3 className="text-lg font-medium">Videos</h3>
					<p className="text-sm text-muted-foreground">
						For any videos related to the film.
					</p>
				</div>
				<Separator />
				<VideoTable data={videos} columns={columns}></VideoTable>
			</div>
		</Container>
	)
}
