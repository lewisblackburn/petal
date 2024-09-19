import { type LoaderFunctionArgs } from '@remix-run/node'
import { json, type MetaFunction } from '@remix-run/react'
import { requireUserWithRole } from '#app/utils/permissions.server.js'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')
	return json({})
}

export default function DashboardAdminPage() {
	return (
		<div>
			<h1>Admin Dashboard</h1>
		</div>
	)
}

export const meta: MetaFunction = () => [
	{ title: 'Import | Metabase' },
	{
		name: 'description',
		content: `Import media to Metabase`,
	},
]
