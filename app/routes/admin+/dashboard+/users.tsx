import { invariantResponse } from '@epic-web/invariant'
import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { columns } from '#app/components/table/user/columns'
import { UserTable } from '#app/components/table/user/data-table'
import { prisma } from '#app/utils/db.server'
import { requireUserWithRole } from '#app/utils/permissions'

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')

	const users = await prisma.user.findMany()

	invariantResponse(users, 'Not found', { status: 404 })

	// const users = film.genres.map(genre => ({
	// 	id: genre.id,
	// 	name: genre.name,
	// 	created: new Date(genre.createdAt),
	// 	updated: new Date(genre.updatedAt),
	// }))

	return json({ users })
}

export default function DashboardUsersRoute() {
	const { users } = useLoaderData<typeof loader>()
	console.log(users)

	return <UserTable data={[]} columns={columns} />
}

export const meta: MetaFunction = () => [{ title: 'Dashboard | Petal' }]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
