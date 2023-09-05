import { type Prisma, type FilmPhoto } from '@prisma/client'
import {
	json,
	type DataFunctionArgs,
	type V2_MetaFunction,
} from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { InfiniteScroll } from '#app/components/infinite-scroll.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { getTableParams } from '#app/utils/request.helper.ts'

const TAKE = 20

export async function loader({ request }: DataFunctionArgs) {
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

	const films = await prisma.film.findMany({
		orderBy,
		skip,
		take,
		where,
		select: {
			id: true,
			title: true,
			photos: {
				take: 1,
				where: {
					primary: true,
					type: 'poster',
				},
			},
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
		<main className="container py-6">
			<Outlet />
			<ul className="grid grid-cols-4 gap-5">
				{combined.map(film => (
					<li key={film.id}>
						<Link to={film.id}>
							<img
								src={
									film.photos.filter(
										(photo: FilmPhoto) => photo.type === 'poster',
									)[0]?.image
								}
								alt={film.title}
								className="aspect-[2/3] h-full w-full rounded-lg bg-muted"
							/>
						</Link>
					</li>
				))}
			</ul>
			<InfiniteScroll take={TAKE} count={data.count} data={combined} />
		</main>
	)
}

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Films | Petal' },
		{
			name: 'description',
			content: `Films on Petal`,
		},
	]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
