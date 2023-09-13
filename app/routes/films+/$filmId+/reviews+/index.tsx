import { type Prisma } from '@prisma/client'
import {
	json,
	type DataFunctionArgs,
	type V2_MetaFunction,
} from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { InfiniteScroll } from '#app/components/infinite-scroll.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { DEFAULT_TAKE, getTableParams } from '#app/utils/request.helper.ts'

export async function loader({ request }: DataFunctionArgs) {
	const { orderBy, search, skip, take } = getTableParams(
		request,
		DEFAULT_TAKE,
		{
			orderBy: 'createdAt',
			order: 'desc',
		},
	)

	const where = {
		OR: search ? [{ content: { contains: search } }] : undefined,
	} satisfies Prisma.FilmReviewWhereInput

	const filmReviews = await prisma.filmReview.findMany({
		orderBy,
		skip,
		take,
		where,
		select: {
			id: true,
			content: true,
			user: {
				select: {
					name: true,
					username: true,
					image: true,
				},
			},
		},
	})

	const count = await prisma.filmReview.count({
		where,
	})

	return json({ filmReviews, count })
}

export default function FilmsRoute() {
	const data = useLoaderData<typeof loader>()
	const location = useLocation()
	const combined = [...(location.state?.data ?? []), ...data.filmReviews]

	return (
		<main className="container py-6">
			<Outlet />
			<ul className="grid grid-cols-4 gap-5">
				{combined.map(filmReview => (
					<li key={filmReview.id}>
						<Link to={filmReview.id}>{filmReview.content}</Link>
					</li>
				))}
			</ul>
			<InfiniteScroll take={DEFAULT_TAKE} count={data.count} data={combined} />
		</main>
	)
}

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Reviews | Petal' },
		{
			name: 'description',
			content: `Reviews on Petal`,
		},
	]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
