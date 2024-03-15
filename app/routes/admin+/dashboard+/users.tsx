import queryString from 'querystring'
import { type Prisma } from '@prisma/client'
import {
	useLoaderData,
	type MetaFunction,
	useSearchParams,
} from '@remix-run/react'
import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import { type PaginationState } from '@tanstack/react-table'
import React from 'react'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { columns } from '#app/components/table/user/columns'
import { UserTable } from '#app/components/table/user/data-table'
import { prisma } from '#app/utils/db.server'
import { requireUserWithRole } from '#app/utils/permissions.server'
import { DEFAULT_TAKE, getTableParams } from '#app/utils/request.helper'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')

	const url = new URL(request.url)
	const pageSize = url.searchParams.get('pageSize')

	const { orderBy, search, skip, take } = getTableParams(
		request,
		parseInt(pageSize ?? DEFAULT_TAKE.toString(), 10),
		{
			orderBy: 'createdAt',
			order: 'desc',
		},
	)

	const where = {
		OR: search
			? [
					{ email: { contains: search } },
					{ name: { contains: search } },
					{ username: { contains: search } },
				]
			: undefined,
	} satisfies Prisma.UserWhereInput

	const users = await prisma.user.findMany({
		orderBy,
		skip,
		take,
		where,
		select: {
			email: true,
			name: true,
			username: true,
			roles: true,
		},
	})

	const count = await prisma.user.count({
		where,
	})

	const totalPages = Math.ceil(count / take)

	const formattedUsers = users.map(user => ({
		email: user.email,
		name: user.name,
		username: user.username,
		role: 'user',
	}))

	return json({ users: formattedUsers, totalPages })
}

export default function DashboardUsersRoute() {
	const { users, totalPages } = useLoaderData<typeof loader>()
	const [params, setParams] = useSearchParams()
	const currentPage = parseInt(params.get('page') || '1') as number
	const currentPageSize = parseInt(
		params.get('take') || DEFAULT_TAKE.toString(),
	) as number

	const [{ pageIndex, pageSize }, setPagination] =
		React.useState<PaginationState>({
			pageIndex: currentPage - 1,
			pageSize: currentPageSize,
		})

	React.useEffect(() => {
		const existingParams = queryString.parse(params.toString())
		setParams(
			queryString.stringify({
				...existingParams,
				page: pageIndex + 1,
				pageSize,
			}),
			{
				state: { data: users },
				preventScrollReset: true,
			},
		)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageIndex, pageSize])

	return (
		<UserTable
			data={users}
			columns={columns}
			pageCount={totalPages}
			pagination={{ pageSize, pageIndex }}
			setPagination={setPagination}
		/>
	)
}

export const meta: MetaFunction = () => [{ title: 'Dashboard | Petal' }]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
