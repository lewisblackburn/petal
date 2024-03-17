import queryString from 'querystring'
import { type Prisma } from '@prisma/client'
import { type LoaderFunctionArgs } from '@remix-run/node'
import {
	json,
	useLoaderData,
	useSearchParams,
	type MetaFunction,
} from '@remix-run/react'
import {
	type FiltersTableState,
	type PaginationState,
} from '@tanstack/react-table'
import React from 'react'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { columns } from '#app/components/table/film/index/columns.js'
import { FilmTable } from '#app/components/table/film/index/data-table.js'
import { prisma } from '#app/utils/db.server'
import { requireUserWithRole } from '#app/utils/permissions.server.js'
import { DEFAULT_TAKE, getSearchParams } from '#app/utils/request.helper.js'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')

	const url = new URL(request.url)
	const pageIndex = Number(url.searchParams.get('page')) || 0
	const pageSize = Number(url.searchParams.get('pageSize')) || DEFAULT_TAKE
	const search = getSearchParams(request)

	const where = {
		OR: search
			? [{ title: { contains: search } }, { tagline: { contains: search } }]
			: undefined,
	} satisfies Prisma.FilmWhereInput

	const films = await prisma.film.findMany({
		skip: pageIndex * pageSize,
		take: pageSize,
		where,
		select: {
			id: true,
			title: true,
			tagline: true,
		},
	})

	const count = await prisma.film.count({
		where,
	})

	const formattedFilms = films.map(film => ({
		id: film.id,
		title: film.title,
		tagline: film.tagline,
	}))

	return json({ films: formattedFilms, count })
}

export default function DashboardFilmsRoute() {
	const { films, count } = useLoaderData<typeof loader>()
	const [params, setParams] = useSearchParams()
	const search = params.get('search') || ''

	const [globalFilter, setGlobalFilter] =
		React.useState<FiltersTableState['globalFilter']>(search)

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: DEFAULT_TAKE,
	})

	React.useEffect(() => {
		const existingParams = queryString.parse(params.toString())
		const isSearching = search.length > 0

		if (isSearching && pagination.pageIndex != 0)
			setPagination({ ...pagination, pageIndex: 0 })

		setParams(
			queryString.stringify({
				...existingParams,
				search: globalFilter,
				page: pagination.pageIndex,
				pageSize: pagination.pageSize,
			}),
			{
				preventScrollReset: true,
			},
		)
	}, [globalFilter, search, params, pagination, setParams])

	return (
		<FilmTable
			data={films}
			columns={columns}
			pagination={pagination}
			setPagination={setPagination}
			globalFilter={globalFilter}
			setGlobalFilter={setGlobalFilter}
			rowCount={count}
		/>
	)
}

export const meta: MetaFunction = () => [{ title: 'Films | Petal' }]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
