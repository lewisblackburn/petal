import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/taglines/columns.tsx'
import { TaglineTable } from '#app/components/table/film/taglines/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			taglines: {
				select: {
					id: true,
					tagline: true,
					createdAt: true,
					updatedAt: true,
				},
			},
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const taglines = film.taglines.map(tagline => ({
		id: tagline.id,
		tagline: tagline.tagline,
		created: new Date(tagline.createdAt),
		updated: new Date(tagline.updatedAt),
	}))

	return json({ taglines })
}

export default function FilmEditTaglinesRoute() {
	const { taglines } = useLoaderData<typeof loader>()

	return <TaglineTable data={taglines} columns={columns} />
}
