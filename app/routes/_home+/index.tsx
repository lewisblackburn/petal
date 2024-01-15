import { json, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Carousel } from '#app/components/carousel.tsx'
import { prisma } from '#app/utils/db.server.ts'

export const meta: MetaFunction = () => [{ title: 'Petal' }]

export async function loader() {
	const popularFilms = await prisma.film.findMany({
		take: 10,
		select: {
			id: true,
			title: true,
			poster: true,
		},
		orderBy: {
			userScore: 'desc',
		},
	})

	const trendingFilms = await prisma.film.findMany({
		take: 10,
		select: {
			id: true,
			title: true,
			poster: true,
		},
		where: {
			updatedAt: {
				gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days
			},
		},
		orderBy: {
			userScore: 'desc',
		},
	})

	return json({ popularFilms, trendingFilms })
}

export default function Index() {
	const { popularFilms, trendingFilms } = useLoaderData<typeof loader>()

	return (
		<div className="container flex flex-col gap-20 py-6">
			{popularFilms.length > 0 && (
				<Carousel
					title="Popular Films"
					items={popularFilms.map(film => {
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
					items={trendingFilms.map(film => {
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
