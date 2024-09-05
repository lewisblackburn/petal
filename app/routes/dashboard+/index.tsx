import { json, useLoaderData } from '@remix-run/react'
import { Carousel } from '#app/components/carousel.js'
import { oneWeekAgo } from '#app/utils/constants.js'
import { prisma } from '#app/utils/db.server.js'
import { GeneralErrorBoundary } from '#app/components/error-boundary.js'

export async function loader() {
	const popularFilms = await prisma.film.findMany({
		take: 10,
		select: {
			id: true,
			title: true,
			poster: true,
		},
		orderBy: {
			voteAverage: 'desc',
		},
	})

	const trendingFilms = await prisma.film.findMany({
		take: 20,
		where: {
			ratings: {
				// NOTE: All films where one or more of its ratings were created in the last week
				some: {
					createdAt: {
						gte: oneWeekAgo(),
					},
				},
			},
		},
		select: {
			id: true,
			title: true,
			poster: true,
			ratings: {
				select: {
					value: true,
				},
			},
		},
		// NOTE: This orders by most ratings (within the week) which is correct as we want the most relevent
		// films not the most popular
		orderBy: {
			ratings: {
				_count: 'desc',
			},
		},
	})

	return json({ popularFilms, trendingFilms })
}

export default function DashboardPage() {
	const { popularFilms, trendingFilms } = useLoaderData<typeof loader>()

	return (
		<div className="flex flex-col gap-20">
			{popularFilms.length > 0 && (
				<Carousel
					title="Popular Films"
					items={popularFilms.map((film) => {
						return {
							id: film.id!,
							title: film.title!,
							image: film.poster!,
							to: `films/${film.id}`,
						}
					})}
				/>
			)}
			{trendingFilms.length > 0 && (
				<Carousel
					title="Trending Films"
					items={trendingFilms.map((film) => {
						return {
							id: film.id!,
							title: film.title!,
							image: film.poster!,
							to: `films/${film.id}`,
						}
					})}
				/>
			)}
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
