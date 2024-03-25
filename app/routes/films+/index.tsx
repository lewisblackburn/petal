import { type Prisma } from '@prisma/client'
import {
	json,
	type MetaFunction,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import { Link, useLoaderData, useLocation } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { FiltersCard } from '#app/components/filters-card'
import Image from '#app/components/image'
import { InfiniteScroll } from '#app/components/infinite-scroll.tsx'

import { SearchCard } from '#app/components/search-card.js'
import { SortCard } from '#app/components/sort-card'
import { WhereToWatchCard } from '#app/components/where-to-watch-card'
import { FILM_SORT_OPTIONS } from '#app/utils/constants'
import { prisma } from '#app/utils/db.server.ts'
import { getTableParams } from '#app/utils/request.helper.ts'

const TAKE = 20

export async function loader({ request }: LoaderFunctionArgs) {
	const { orderBy, search, skip, take } = getTableParams(request, TAKE, {
		orderBy: 'viewCount',
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

	const films = await prisma.film.findMany({
		orderBy,
		skip,
		take,
		where,
		select: {
			id: true,
			title: true,
			poster: true,
		},
	})

	const count = await prisma.film.count({
		where,
	})

	return json({ films, count })
}

export default function FilmsRoute() {
	const data = useLoaderData<typeof loader>()
	const location = useLocation()
	const combined = [...(location.state?.data ?? []), ...data.films]

	return (
		<main className="flex gap-10">
			<div className="flex flex-col gap-2">
				<SearchCard />
				<SortCard sortOptions={FILM_SORT_OPTIONS} />
				<WhereToWatchCard />
				<FiltersCard />
			</div>
			<div className="w-full">
				<ul className="grid grid-cols-4 gap-5">
					{combined.map(film => (
						<li key={film.id}>
							<Link to={film.id}>
								<Image
									src={film.poster}
									fallbackSrc={'/img/300x450.png'}
									alt={film.title}
									className="aspect-[2/3] h-full w-full rounded-lg bg-muted"
								/>
							</Link>
						</li>
					))}
				</ul>
				<InfiniteScroll take={TAKE} count={data.count} data={combined} />
			</div>
		</main>
	)
}

export const meta: MetaFunction = () => [
	{ title: 'Films | Petal' },
	{
		name: 'description',
		content: `Films on Petal`,
	},
]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
