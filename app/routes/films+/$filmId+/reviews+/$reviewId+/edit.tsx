import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { FilmReviewEditor } from '#app/routes/films+/__film-review-editor.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export { action } from '../../../__film-review-editor.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
	await requireUserId(request)
	const filmReview = await prisma.filmReview.findFirst({
		select: {
			id: true,
			title: true,
			content: true,
			rating: {
				select: {
					value: true,
				},
			},
		},
		where: {
			id: params.reviewId,
		},
	})

	invariantResponse(filmReview, 'Not found', { status: 404 })
	return json({ filmReview })
}

export default function FilmEditRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<div>
			<FilmReviewEditor
				review={data.filmReview}
				rating={data.filmReview.rating?.value}
			/>
		</div>
	)
}
