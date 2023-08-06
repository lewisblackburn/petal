import { useLoaderData } from '@remix-run/react'
import {
	type DataFunctionArgs,
	type HeadersFunction,
	json,
} from '@remix-run/server-runtime'
import { Container } from '~/components/container.tsx'
import { columns } from '~/components/table/photos/columns.tsx'
import { PhotoTable } from '~/components/table/photos/data-table.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)
	const timings = makeTimings('photo loader')

	const film = await time(
		() =>
			prisma.film.findUnique({
				where: {
					id: params.filmId,
				},
				select: {
					// NOTE: There is no point ordering photos by primary, becuase you can do this in the client
					// SQL orderBy query's are expensive, so we should avoid them where possible
					photos: true,
				},
			}),
		{ timings, type: 'find photos' },
	)

	if (!film) {
		throw new Response('Not found', { status: 404 })
	}

	const photos = film.photos.map(photo => ({
		id: photo.id,
		type: photo.type,
		primary: photo.primary,
		language: photo.language,
		image: photo.image,
	}))

	return json({ photos }, { headers: { 'Server-Timing': timings.toString() } })
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export default function FilmEditPhoto() {
	const { photos } = useLoaderData<typeof loader>()

	return (
		<Container>
			<PhotoTable data={photos} columns={columns}></PhotoTable>
		</Container>
	)
}
