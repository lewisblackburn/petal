import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { columns } from '#app/components/table/film/keywords/columns.tsx'
import { KeywordTable } from '#app/components/table/film/keywords/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request, params }: LoaderFunctionArgs) {
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
		name: keyword.name,
		created: new Date(keyword.createdAt),
		updated: new Date(keyword.updatedAt),
	}))

	return json({ keywords })
}

export default function FilmEditKeywordsRoute() {
	const { keywords } = useLoaderData<typeof loader>()

	return <KeywordTable data={keywords} columns={columns} />
}
