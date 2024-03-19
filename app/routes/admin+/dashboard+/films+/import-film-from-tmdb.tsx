import queryString from 'querystring'
import { parseWithZod } from '@conform-to/zod'
import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from '@remix-run/node'
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
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { columns } from '#app/components/table/film/import/columns.js'
import { ImportFilmTable } from '#app/components/table/film/import/data-table.js'
import { tmdb } from '#app/utils/import.service.js'
import { useDebounce } from '#app/utils/misc.js'
import { requireUserWithRole } from '#app/utils/permissions.server.js'
import { getSearchParams } from '#app/utils/request.helper.js'
import { createToastHeaders } from '#app/utils/toast.server.js'

export const ImportFilmSchema = z.object({
	tmdbID: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserWithRole(request, 'admin')
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: ImportFilmSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { tmdbID } = submission.value

	const importedFilm = await tmdb.importFilm(tmdbID)

	if (!importedFilm) {
		return json(
			{ result: submission.reply() },
			{
				headers: await createToastHeaders({
					description: 'Failed to import film.',
					type: 'error',
				}),
			},
		)
	}

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Imported film.',
				type: 'success',
			}),
		},
	)
}

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')

	const url = new URL(request.url)
	const pageIndex = Number(url.searchParams.get('page')) || 1
	const search = getSearchParams(request)

	const tmdbFilms = await tmdb.searchFilms(search || '', pageIndex)

	return json({ films: tmdbFilms.results, count: tmdbFilms.total_results })
}

export default function DashboardImportFilmFromTMDBRoute() {
	const { films, count } = useLoaderData<typeof loader>()

	const [params, setParams] = useSearchParams()
	const search = params.get('search') || ''

	const [globalFilter, setGlobalFilter] =
		React.useState<FiltersTableState['globalFilter']>(search)

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	})

	React.useEffect(() => {
		if (globalFilter?.length > 0 && pagination.pageIndex != 0)
			setPagination({ ...pagination, pageIndex: 0 })

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [globalFilter, setGlobalFilter])

	const handleSearch = () => {
		const existingParams = queryString.parse(params.toString())

		setParams(
			queryString.stringify({
				...existingParams,
				search: globalFilter,
				page: pagination.pageIndex + 1,
				pageSize: pagination.pageSize,
			}),
			{
				preventScrollReset: true,
			},
		)
	}

	const debouncedSearch = useDebounce(handleSearch, 500)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(debouncedSearch, [pagination, globalFilter])

	return (
		<ImportFilmTable
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

export const meta: MetaFunction = () => [
	{ title: 'Import Film from TMDB | Petal' },
]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
