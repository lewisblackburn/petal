import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
	FilmReviewEditor,
	action,
} from '#app/routes/films+/__film-review-editor.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export { action }

export async function loader({ params, request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const filmRating = await prisma.filmRating.findFirst({
		select: {
			value: true,
		},
		where: {
			filmId: params.filmId,
			userId,
		},
	})

	return json({ filmRating })
}

export default function FilmEditRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="container py-6">
			<FilmReviewEditor rating={data.filmRating?.value} />
		</div>
	)
}
