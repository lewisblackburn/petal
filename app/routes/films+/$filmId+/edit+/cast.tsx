import { useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/cast/columns.tsx'
import { CastTable } from '#app/components/table/film/cast/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse, orderByRationalProperty } from '#app/utils/misc.tsx'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)

	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			cast: {
				include: {
					person: true,
				},
			},
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const cast = film.cast.map(cast => ({
		id: cast.id,
		personId: cast.personId,
		name: cast.person.name,
		character: cast.character,
		numerator: cast.numerator,
		denominator: cast.denominator,
	}))

	return json({ cast: orderByRationalProperty(cast) })
}

export default function FilmEditCast() {
	const { cast } = useLoaderData<typeof loader>()

	return (
		<div className="container py-6">
			{/* FIX: Dropdown resetting scroll */}
			<CastTable data={cast} columns={columns} />
		</div>
	)
}
