import queryString from 'querystring'
import { getInputProps, getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { type Prisma } from '@prisma/client'
import { type LoaderFunctionArgs } from '@remix-run/node'
import {
	json,
	useFetcher,
	useLoaderData,
	useSearchParams,
	type MetaFunction,
} from '@remix-run/react'
import {
	type FiltersTableState,
	type PaginationState,
} from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { ErrorList, Field } from '#app/components/forms'
import { columns } from '#app/components/table/film/index/columns.js'
import { FilmTable } from '#app/components/table/film/index/data-table.js'
import { Button } from '#app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '#app/components/ui/dialog'
import { Icon } from '#app/components/ui/icon'
import { StatusButton } from '#app/components/ui/status-button'
import {
	type action as ImportFilmFromTMDBAction,
	ImportFilmSchema,
} from '#app/routes/resources+/film+/import'
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
	const fetcher = useFetcher<typeof ImportFilmFromTMDBAction>()
	const [open, setOpen] = useState(false)

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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination, globalFilter])

	const [form, fields] = useForm({
		id: 'import-film-form',
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ImportFilmSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		if (form.status === 'success') {
			setOpen(false)
			form.reset()
		}
	}, [form])

	return (
		<div className="flex flex-col space-y-10">
			<FilmTable
				data={films}
				columns={columns}
				pagination={pagination}
				setPagination={setPagination}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
				rowCount={count}
			/>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline" size="sm" className="h-8 w-36">
						<Icon name="plus" className="mr-2 h-4 w-4" />
						Import Film
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<fetcher.Form
						method="POST"
						action="/resources/film/import"
						name="import-film-form"
						{...getFormProps(form)}
					>
						<DialogHeader>
							<DialogTitle>Import Film</DialogTitle>
							<DialogDescription>
								Import a new film from TMDB.
							</DialogDescription>
						</DialogHeader>
						<div className="grid py-4">
							<Field
								labelProps={{
									htmlFor: fields.tmdbID.id,
									children: 'TMDB ID',
								}}
								inputProps={{
									...getInputProps(fields.tmdbID, { type: 'text' }),
									autoComplete: 'off',
								}}
								errors={fields.tmdbID.errors}
							/>
							<ErrorList errors={form.errors} id={form.errorId} />
						</div>
						<DialogFooter>
							<StatusButton
								type="submit"
								variant="outline"
								status={
									fetcher.state !== 'idle' ? 'pending' : form.status ?? 'idle'
								}
								disabled={fetcher.state !== 'idle'}
								className="w-full max-md:aspect-square max-md:px-0"
							>
								<Icon name="plus" className="scale-125 max-md:scale-150">
									<span className="max-md:hidden">Import Film</span>
								</Icon>
							</StatusButton>
						</DialogFooter>
					</fetcher.Form>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export const meta: MetaFunction = () => [{ title: 'Dashboard | Petal' }]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
