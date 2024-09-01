import { invariant } from '@epic-web/invariant'
import { Outlet, useRouteLoaderData } from '@remix-run/react'
import { type loader as rootLoader } from '#app/root'
import { ThemeSwitch } from '#app/routes/resources+/theme-switch.js'
import { Logo } from '../logo'
import NavigationBar from '../navigation-bar'

export const Layout = () => {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	invariant(data?.requestInfo, 'No requestInfo found in root loader')

	return (
		<div className="flex min-h-screen flex-col justify-between bg-muted/30">
			<NavigationBar />

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
