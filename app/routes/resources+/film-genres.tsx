import { type Prisma } from '@prisma/client'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { json, useFetcher } from '@remix-run/react'
import { SearchSelectConform } from '#app/components/form/conform/SearchSelect.js'
import { prisma } from '#app/utils/db.server.js'
import { getTableParams } from '#app/utils/request.helper.js'

export async function loader({ request }: LoaderFunctionArgs) {
	const { search, take } = getTableParams(request, 5, {
		orderBy: 'createdAt',
		order: 'desc',
	})

	const where = {
		OR: search ? [{ name: { contains: search } }] : undefined,
	} satisfies Prisma.FilmGenreWhereInput

	const filmGenres = await prisma.filmGenre.findMany({
		take,
		where,
		select: {
			id: true,
			name: true,
		},
	})

	return json({ filmGenres })
}

export const FilmGenreSearchConform = ({ fields }: { fields: any }) => {
	const fetcher = useFetcher<typeof loader>()

	const items =
		fetcher.data?.filmGenres.map((genre) => ({
			value: genre.id,
			label: genre.name,
		})) || []

	const handleSearch = (e: any) => {
		const searchValue = e.currentTarget.value

		fetcher.submit(
			{ search: searchValue },
			{ method: 'GET', action: '/resources/film-genres' },
		)
	}

	return (
		<SearchSelectConform items={items} onInput={handleSearch} meta={fields} />
	)
}
