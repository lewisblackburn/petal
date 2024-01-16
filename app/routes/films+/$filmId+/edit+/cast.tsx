import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/cast/columns.tsx'
import { CastTable } from '#app/components/table/film/cast/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { orderByRationalProperty } from '#app/utils/misc.tsx'

export async function loader({ request, params }: LoaderFunctionArgs) {
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

export default function FilmEditCastRoute() {
	const { cast } = useLoaderData<typeof loader>()

	// FIX: Dropdown resetting scroll
	return <CastTable data={cast} columns={columns} />
}
