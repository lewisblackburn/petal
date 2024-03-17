import { type LoaderFunctionArgs } from '@remix-run/node'
import { json, type MetaFunction } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { requireUserWithRole } from '#app/utils/permissions.server.js'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')
	return json({})
}

export default function DashboardImportFilmFromTMDBRoute() {
	return <div>import film from tmdb</div>
}

export const meta: MetaFunction = () => [
	{ title: 'Import Film from TMDB | Petal' },
]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
