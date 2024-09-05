import { parseWithZod } from '@conform-to/zod'
import {
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
} from '@remix-run/node'
import {
	json,
	useLoaderData,
	useSearchParams,
	type MetaFunction,
} from '@remix-run/react'
import {
	type GlobalFilterTableState,
	type PaginationState,
} from '@tanstack/react-table'
import React from 'react'
import { z } from 'zod'
import ButtonGroup, {
	type ButtonGroupProps,
} from '#app/components/button-group.js'
import { type TMDBSearchResponse } from '#app/types/tmdb.js'
import { useDebounce } from '#app/utils/misc.js'
import { requireUserWithRole } from '#app/utils/permissions.server.js'
import { getSearchParams } from '#app/utils/request-helper.js'
import { tmdb } from '#app/utils/services/import.service.js'
import { TMDBFilmImporter } from '#app/utils/services/tmdb/film.js'
import { createToastHeaders } from '#app/utils/toast.server.js'
import { columns } from './table/import/columns'
import { ImportFilmTable } from './table/import/data-table'

export const ImportFilmSchema = z.object({
	tmdbIds: z.string(),
})

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')

	const url = new URL(request.url)
	const pageIndex = Number(url.searchParams.get('page')) || 1
	const search = getSearchParams(request)

	const tmdbFilms = await tmdb.search<TMDBSearchResponse>(
		search || 'about',
		pageIndex,
		'movie',
	)

	return json({ films: tmdbFilms.results, count: tmdbFilms.total_results })
}

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

	let { tmdbIds } = submission.value

	const parsedIds = JSON.parse(tmdbIds) as string[]
	const filmImporter = new TMDBFilmImporter()

	for (const id of parsedIds) {
		const importedFilm = await filmImporter.import(id)

		if (!importedFilm) {
			return json(
				{ result: submission.reply() },
				{
					headers: await createToastHeaders({
						description: `Failed to import ${id}.`,
						type: 'error',
					}),
				},
			)
		}
	}

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Imported films.',
				type: 'success',
			}),
		},
	)
}

const NavigationLinks: ButtonGroupProps['pages'] = [
	{ name: 'Import Film', path: '' },
	{ name: 'Import Series', path: '/series', disabled: true },
	{ name: 'Import Person', path: '/person', disabled: true },
	{ name: 'Import Book', path: '/book', disabled: true },
	{ name: 'Import Song', path: '/song', disabled: true },
	{ name: 'Import Album', path: '/album', disabled: true },
	{ name: 'Import Game', path: '/game', disabled: true },
	{ name: 'Import Podcast', path: '/podcast', disabled: true },
]

export default function DashboardAdminImportPage() {
	const { films, count } = useLoaderData<typeof loader>()

	const [params, setParams] = useSearchParams()
	const search = params.get('search') || ''

	const [globalFilter, setGlobalFilter] =
		React.useState<GlobalFilterTableState['globalFilter']>(search)

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
		const urlParams = new URLSearchParams(params.toString())

		urlParams.set('search', globalFilter)
		urlParams.set('page', (pagination.pageIndex + 1).toString())
		urlParams.set('pageSize', pagination.pageSize.toString())

		setParams(urlParams.toString(), {
			preventScrollReset: true,
		})
	}

	const debouncedSearch = useDebounce(handleSearch, 500)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(debouncedSearch, [pagination, globalFilter])

	return (
		<div className="flex flex-col gap-10">
			<ButtonGroup pages={NavigationLinks} fullWidth />
			<ImportFilmTable
				data={films}
				columns={columns}
				pagination={pagination}
				setPagination={setPagination}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
				rowCount={count}
			/>
		</div>
	)
}

export const meta: MetaFunction = () => [{ title: 'Import Media | Petal' }]
