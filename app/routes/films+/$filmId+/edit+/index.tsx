import { json, type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '~/utils/db.server.ts'
import { FilmEditor } from '~/routes/resources+/film-editor.tsx'
import { formatDateWithDashes } from '~/utils/misc.ts'
import { Container } from '~/components/container.tsx'
import { CreditTable } from '~/components/table/credits/data-table.tsx'
import { columns } from '~/components/table/credits/columns.tsx'

export async function loader({ params }: DataFunctionArgs) {
	const film = await prisma.film.findFirst({
		where: {
			id: params.filmId,
		},
		include: {
			credits: {
				include: {
					person: true,
				},
			},
		},
	})

	if (!film) {
		throw new Response('Not found', { status: 404 })
	}

	return json({
		film: {
			...film,
			releaseDate: film.releaseDate && formatDateWithDashes(film.releaseDate),
		},
	})
}

export default function FilmEdit() {
	const { film } = useLoaderData<typeof loader>()
	const credits = film.credits.map(credit => ({
		id: credit.id,
		name: credit.person.name,
		character: credit.character,
		job: credit.job,
		department: credit.department,
	}))

	return (
		<>
			<Container>
				<CreditTable data={credits} columns={columns} />
			</Container>
			<FilmEditor
				film={{
					id: film.id,
					title: film.title,
					tagline: film.tagline,
					overview: film.overview,
					releaseDate: film.releaseDate,
					runtime: film.runtime,
					budget: film.budget,
					revenue: film.revenue,
					status: film.status,
					twitter: film.twitter,
					instagram: film.instagram,
					website: film.website,
					tmdbId: film.tmdbId,
				}}
			/>
		</>
	)
}
