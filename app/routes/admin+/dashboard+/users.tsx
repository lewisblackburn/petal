import queryString from 'querystring'
import { type Prisma } from '@prisma/client'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import {
	useLoaderData,
	type MetaFunction,
	useSearchParams,
} from '@remix-run/react'
import {
	type SortingState,
	type PaginationState,
	type GlobalFilterTableState,
} from '@tanstack/react-table'
import React from 'react'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { columns } from '#app/components/table/user/columns'
import { UserTable } from '#app/components/table/user/data-table'
import { prisma } from '#app/utils/db.server'
import { requireUserWithRole } from '#app/utils/permissions.server'
import {
	DEFAULT_TAKE,
	type Sort,
	getOrderByParams,
	getSearchParams,
} from '#app/utils/request.helper'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')

	const url = new URL(request.url)
	const pageIndex = Number(url.searchParams.get('page')) || 0
	const pageSize = Number(url.searchParams.get('pageSize')) || DEFAULT_TAKE
	const search = getSearchParams(request)
	const orderBy = getOrderByParams(request, { order: 'asc', orderBy: 'name' })

	const where = {
		OR: search
			? [
					{ email: { contains: search } },
					{ name: { contains: search } },
					{ username: { contains: search } },
					{ roles: { some: { name: { contains: search } } } },
				]
			: undefined,
	} satisfies Prisma.UserWhereInput

	const users = await prisma.user.findMany({
		orderBy,
		skip: pageIndex * pageSize,
		take: pageSize,
		where,
		select: {
			id: true,
			email: true,
			name: true,
			username: true,
			roles: true,
		},
	})

	const count = await prisma.user.count({
		where,
	})

	const formattedUsers = users.map((user) => ({
		id: user.id,
		email: user.email,
		name: user.name,
		username: user.username,
		roles: user.roles,
	}))

	return json({ users: formattedUsers, count })
}

export default function DashboardUsersRoute() {
	const { users, count } = useLoaderData<typeof loader>()
	const [params, setParams] = useSearchParams()
	const search = params.get('search') || ''

	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: 'name',
			desc: false,
		},
	])

	const [globalFilter, setGlobalFilter] =
		React.useState<GlobalFilterTableState['globalFilter']>(search)

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
			order: sorting[0]!.desc ? 'desc' : 'asc',
			orderBy: sorting[0]!.id,
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination, globalFilter, sorting])

	return (
		<UserTable
			data={users}
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

export const meta: MetaFunction = () => [{ title: 'Dashboard | Petal' }]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
