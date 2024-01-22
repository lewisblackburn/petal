import { invariant } from '@epic-web/invariant'
import { Link, Outlet, useRouteLoaderData } from '@remix-run/react'
import { ThemeSwitch, type loader as rootLoader } from '#app/root'
import { NavigationBar } from '../navigation-bar'

export const Layout = () => {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	invariant(data?.requestInfo, 'No requestInfo found in root loader')

	return (
		<div className="flex h-screen flex-col justify-between">
			<NavigationBar />

			<div className="flex-1">
				<Outlet />
			</div>

			<div className="container flex justify-between py-10">
				<Logo />
				<ThemeSwitch userPreference={data.requestInfo.userPrefs.theme} />
			</div>
		</div>
	)
}

function Logo() {
	return (
		<Link to="/" className="group grid leading-snug">
			<span className="font-bold transition">Petal</span>
		</Link>
	)
}
