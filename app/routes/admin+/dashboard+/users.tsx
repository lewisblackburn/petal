import queryString from 'querystring'
import { type Prisma } from '@prisma/client'
import {
	useLoaderData,
	type MetaFunction,
	useSearchParams,
} from '@remix-run/react'
import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import {
	type FiltersTableState,
	type PaginationState,
} from '@tanstack/react-table'
import React from 'react'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { columns } from '#app/components/table/user/columns'
import { UserTable } from '#app/components/table/user/data-table'
import { prisma } from '#app/utils/db.server'
import { requireUserWithRole } from '#app/utils/permissions.server'
import { DEFAULT_TAKE, getSearchParams } from '#app/utils/request.helper'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')

	const url = new URL(request.url)
	const pageIndex = Number(url.searchParams.get('page')) || 0
	const pageSize = Number(url.searchParams.get('pageSize')) || DEFAULT_TAKE
	const search = getSearchParams(request)

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

	const formattedUsers = users.map(user => ({
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

	return (
		<UserTable
			data={users}
			columns={columns}
			pagination={pagination}
			setPagination={setPagination}
			globalFilter={globalFilter}
			setGlobalFilter={setGlobalFilter}
			rowCount={count}
		/>
	)
}

export const meta: MetaFunction = () => [{ title: 'Dashboard | Petal' }]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
