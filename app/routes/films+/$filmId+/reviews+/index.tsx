import { type Prisma } from '@prisma/client'
import {
	json,
	type DataFunctionArgs,
	type V2_MetaFunction,
} from '@remix-run/node'
import { Link, useLoaderData, useLocation } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { InfiniteScroll } from '#app/components/infinite-scroll.tsx'
import { ReviewCard } from '#app/components/review-card.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
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
			title: true,
			content: true,
			createdAt: true,
			filmId: true,
			user: {
				select: {
					name: true,
					username: true,
					initials: true,
					image: true,
				},
			},
			rating: {
				select: {
					value: true,
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
			<div className="flex gap-10">
				<Link to="new">
					<Button variant="default" className="w-[200px]">
						<Icon name="pencil-1" className="scale-125 max-md:scale-150">
							Write a review
						</Icon>
					</Button>
				</Link>
				<ul className="flex w-full flex-col gap-5 ">
					{combined.map(filmReview => (
						<ReviewCard
							filmId={filmReview.filmId}
							key={filmReview.id}
							review={filmReview}
						/>
					))}
				</ul>
			</div>
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
