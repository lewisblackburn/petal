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
import { requireUserWithRole } from '#app/utils/permissions'
import { DEFAULT_TAKE, getTableParams } from '#app/utils/request.helper'

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')

	const { orderBy, search, skip, take } = getTableParams(
		request,
		DEFAULT_TAKE,
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
	})

	const count = await prisma.user.count({
		where,
	})

	const formattedUsers = users.map(user => ({
		email: user.email,
		name: user.name,
		username: user.username,
	}))

	return json({ users: formattedUsers, count })
}

export default function DashboardUsersRoute() {
	const { users, count } = useLoaderData<typeof loader>()
	const [params, setParams] = useSearchParams()
	const currentPage = parseInt(params.get('page') || '1') as number
	const totalPages = Math.ceil(count / DEFAULT_TAKE)

	const [{ pageIndex, pageSize }, setPagination] =
		React.useState<PaginationState>({
			pageIndex: currentPage - 1,
			pageSize: DEFAULT_TAKE,
		})

	React.useEffect(() => {
		const existingParams = queryString.parse(params.toString())
		setParams(
			queryString.stringify({ ...existingParams, page: pageIndex + 1 }),
			{
				state: { data: users },
				preventScrollReset: true,
			},
		)
	}, [pageIndex])

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
