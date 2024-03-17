import { type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, json, type MetaFunction } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { requireUserWithRole } from '#app/utils/permissions.server.js'
import ButtonGroup, { ButtonGroupProps } from '#app/components/button-group'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserWithRole(request, 'admin')
	return json({})
}

const NavigationLinks: ButtonGroupProps['pages'] = [
	{ name: 'Spotlist', path: '' },
	{
		name: 'The Movie Database (TMDB)',
		path: 'import-film-from-tmdb',
	},
	{
		name: 'Internet Movie Database (IMDB)',
		path: 'import-film-from-imdb',
		disabled: true,
	},
]

export default function DashboardFilmsRoute() {
	return (
		<div>
			<div className="mb-16">
				<ButtonGroup pages={NavigationLinks} />
			</div>
			<main>
				<Outlet />
			</main>
		</div>
	)
}

export const meta: MetaFunction = () => [{ title: 'Dashboard | Petal' }]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
