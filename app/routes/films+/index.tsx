import { type Prisma, type Film } from '@prisma/client'
import {
	json,
	type HeadersFunction,
	type DataFunctionArgs,
} from '@remix-run/node'
import { Link, useLoaderData, useLocation } from '@remix-run/react'
import { prisma } from '~/utils/db.server.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'
import { InfiniteScroll } from '~/components/infinite-scroll.tsx'
import { SortBy } from '~/components/sort-by.tsx'
import { Container } from '~/components/container.tsx'
import { getTableParams } from '~/utils/request.helper.ts'

const TAKE = 30

export async function loader({ request }: DataFunctionArgs) {
	const timings = makeTimings('films loader')

	const { orderBy, search, skip, take } = getTableParams(request, TAKE, {
		orderBy: 'createdAt',
		order: 'desc',
	})
	const where = {
		OR: search
			? [
				{ title: { contains: search } },
				{ tagline: { contains: search } },
				{ overview: { contains: search } },
			]
			: undefined,
	} satisfies Prisma.FilmWhereInput

	const films = await time(
		() =>
			prisma.film.findMany({
				orderBy,
				skip,
				take,
				where,
			}),
		{ timings, type: 'find films' },
	)
	const count = await time(
		() =>
			prisma.film.count({
				where,
			}),
		{ timings, type: 'find film count' },
	)

	return json(
		{ films, count },
		{ headers: { 'Server-Timing': timings.toString() } },
	)
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

// TODO: Still need to fix the flash, it is due to the combined code
// TODO: Image delete, tyring to think of a better way than creating delete-image and delete-image-with-auth
export default function FilmsRoute() {
	const data = useLoaderData<typeof loader>()
	const location = useLocation()
	const combined = [...(location.state?.data ?? []), ...data.films]

	return (
		<Container className="grid grid-cols-[300px_1fr] gap-5">
			<div>
				<SortBy />
			</div>
			<main>
				<ul className="grid grid-cols-4 gap-5">
					{combined.map((film: Film) => (
						<li key={film.id}>
							<Link to={film.id}>
								<img
									src={film.poster ?? ''}
									alt={film.title}
									className="aspect-a4 rounded-lg bg-muted"
								/>
							</Link>
						</li>
					))}
				</ul>
				<InfiniteScroll take={TAKE} count={data.count} data={combined} />
			</main>
		</Container>
	)
}
