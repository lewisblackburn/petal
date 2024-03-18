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
	type SortingState,
	type FiltersTableState,
	type PaginationState,
} from '@tanstack/react-table'
import React from 'react'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { columns } from '#app/components/table/film/index/columns.js'
import { FilmTable } from '#app/components/table/film/index/data-table.js'
import { prisma } from '#app/utils/db.server'
import { requireUserWithRole } from '#app/utils/permissions.server.js'
import {
	DEFAULT_TAKE,
	type Sort,
	getSearchParams,
	getOrderByParams,
} from '#app/utils/request.helper.js'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')

	const url = new URL(request.url)
	const pageIndex = Number(url.searchParams.get('page')) || 0
	const pageSize = Number(url.searchParams.get('pageSize')) || DEFAULT_TAKE
	const search = getSearchParams(request)
	const orderBy = getOrderByParams(request, { order: 'asc', orderBy: 'title' })

	const where = {
		OR: search
			? [{ title: { contains: search } }, { tagline: { contains: search } }]
			: undefined,
	} satisfies Prisma.FilmWhereInput

	const films = await prisma.film.findMany({
		orderBy,
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

	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: 'title',
			desc: false,
		},
	])

	const [globalFilter, setGlobalFilter] =
		React.useState<FiltersTableState['globalFilter']>(search)

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: DEFAULT_TAKE,
	})

	React.useEffect(() => {
		if (globalFilter?.length > 0 && pagination.pageIndex != 0)
			setPagination({ ...pagination, pageIndex: 0 })

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [globalFilter, setGlobalFilter])

	React.useEffect(() => {
		const existingParams = queryString.parse(params.toString())

		const order: Sort = {
			order: sorting[0].desc ? 'desc' : 'asc',
			orderBy: sorting[0].id,
		}

		setParams(
			queryString.stringify({
				...existingParams,
				search: globalFilter,
				page: pagination.pageIndex,
				pageSize: pagination.pageSize,
				...order,
			}),
			{
				preventScrollReset: true,
			},
		)
	}, [globalFilter, search, params, pagination, setParams, sorting])

	return (
		<FilmTable
			data={films}
			columns={columns}
			pagination={pagination}
			setPagination={setPagination}
			globalFilter={globalFilter}
			setGlobalFilter={setGlobalFilter}
			sorting={sorting}
			setSorting={setSorting}
			rowCount={count}
		/>
	)
}

export const meta: MetaFunction = () => [{ title: 'Films | Petal' }]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
