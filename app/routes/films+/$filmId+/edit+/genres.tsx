import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '~/utils/db.server.ts'
import { Container } from '~/components/container.tsx'
import { columns } from '~/components/table/genres/columns.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'
import { GenreTable } from '~/components/table/genres/data-table.tsx'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)
	const timings = makeTimings('genres loader')

	const film = await time(
		() =>
			prisma.film.findUnique({
				where: {
					id: params.filmId,
				},
				select: {
					genres: true,
				},
			}),
		{ timings, type: 'find genres' },
	)

	if (!film) {
		throw new Response('Not found', { status: 404 })
	}

	const genres = film.genres.map(genre => ({
		id: genre.id,
		name: genre.name,
		created: genre.createdAt,
		updated: genre.updatedAt,
	}))

	return json({ genres }, { headers: { 'Server-Timing': timings.toString() } })
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export default function FilmEditGenres() {
	const { genres } = useLoaderData<typeof loader>()

	return (
		<Container>
			<GenreTable data={genres} columns={columns} />
		</Container>
	)
}
