import { useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/keywords/columns.tsx'
import { KeywordTable } from '#app/components/table/film/keywords/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			keywords: true,
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const keywords = film.keywords.map(keyword => ({
		id: keyword.id,
		name: keyword.name,
		created: new Date(keyword.createdAt),
		updated: new Date(keyword.updatedAt),
	}))

	return json({ keywords })
}

export default function FilmEditKeywordsRoute() {
	const { keywords } = useLoaderData<typeof loader>()

	return (
		<div className="container py-6">
			{/* FIX: Dropdown resetting scroll */}
			<KeywordTable data={keywords} columns={columns} />
		</div>
	)
}
