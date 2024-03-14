import { invariant } from '@epic-web/invariant'
import { Outlet, useMatches, useRouteLoaderData } from '@remix-run/react'
import { ThemeSwitch, type loader as rootLoader } from '#app/root'
import { Logo } from '../logo'
import NavigationBar from './navigation-bar'
import Sidebar from './side-bar'

export const Layout = () => {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	const matches = useMatches()
	invariant(data?.requestInfo, 'No requestInfo found in root loader')

	const isOnDashboardPage = !!matches.find(m =>
		m.pathname.startsWith('/admin/dashboard'),
	)

	if (isOnDashboardPage) {
		return (
			<>
				<NavigationBar isOnDashboardPage={isOnDashboardPage} />
				<div className="flex h-screen border-collapse overflow-hidden">
					<Sidebar />
					<main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10 px-8 pb-12 pt-24">
						<div className="flex flex-col gap-5">
							<div className="flex items-center justify-between space-y-2">
								<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
							</div>
							<Outlet />
						</div>
					</main>
				</div>
			</>
		)
	} else
		return (
			<div className="flex h-screen flex-col justify-between">
				<NavigationBar isOnDashboardPage={isOnDashboardPage} />

				<div className="container flex-1 py-6">
					<Outlet />
				</div>

				<div className="container flex justify-between py-10">
					<Logo />
					<ThemeSwitch userPreference={data.requestInfo.userPrefs.theme} />
				</div>
			</div>
		)
}
