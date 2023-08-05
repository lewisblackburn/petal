import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '~/utils/db.server.ts'
import { Container } from '~/components/container.tsx'
import { CastTable } from '~/components/table/cast/data-table.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'
import { columns } from '~/components/table/cast/columns.tsx'
import { orderByRationalProperty } from '~/utils/misc.tsx'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)
	const timings = makeTimings('cast loader')

	const film = await time(
		() =>
			prisma.film.findUnique({
				where: {
					id: params.filmId,
				},
				select: {
					cast: {
						include: {
							person: true,
						},
					},
				},
			}),
		{ timings, type: 'find cast' },
	)

	if (!film) {
		throw new Response('Not found', { status: 404 })
	}

	const cast = film.cast.map(cast => ({
		id: cast.id,
		name: cast.person.name,
		character: cast.character,
		numerator: cast.numerator,
		denominator: cast.denominator,
	}))

	return json(
		{ cast: orderByRationalProperty(cast) },
		{ headers: { 'Server-Timing': timings.toString() } },
	)
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export default function FilmEditCast() {
	const { cast } = useLoaderData<typeof loader>()

	return (
		<Container>
			{/* FIX: Dropdown resetting scroll */}
			<CastTable data={cast} columns={columns} />
		</Container>
	)
}
