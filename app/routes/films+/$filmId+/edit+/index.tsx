import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '~/utils/db.server.ts'
import { FilmEditor } from '~/routes/resources+/film-editor.tsx'
import { formatDateWithDashes } from '~/utils/misc.tsx'
import { Container } from '~/components/container.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)
	const timings = makeTimings('film loader')

	const film = await time(
		() =>
			prisma.film.findUnique({
				where: {
					id: params.filmId,
				},
			}),
		{ timings, type: 'find film' },
	)

	if (!film) {
		throw new Response('Not found', { status: 404 })
	}

	return json(
		{
			film: {
				...film,
				releaseDate: film.releaseDate && formatDateWithDashes(film.releaseDate),
			},
		},
		{ headers: { 'Server-Timing': timings.toString() } },
	)
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export default function FilmEdit() {
	const { film } = useLoaderData<typeof loader>()

	return (
		<Container>
			<FilmEditor
				film={{
					id: film.id,
					title: film.title,
					tagline: film.tagline,
					overview: film.overview,
					releaseDate: film.releaseDate,
					runtime: film.runtime,
					budget: film.budget,
					revenue: film.revenue,
					status: film.status,
					twitter: film.twitter,
					instagram: film.instagram,
					website: film.website,
					tmdbId: film.tmdbId,
				}}
			/>
		</Container>
	)
}
