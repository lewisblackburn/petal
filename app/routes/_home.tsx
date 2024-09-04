import { invariant } from '@epic-web/invariant'
import { Outlet, useRouteLoaderData } from '@remix-run/react'
import Footer from '#app/components/footer.js'
import NavigationBar from '#app/components/navigation-bar.js'
import { type loader as rootLoader } from '#app/root'

export default function HomePageLayout() {
	const data = useRouteLoaderData<typeof rootLoader>('root')
	invariant(data?.requestInfo, 'No requestInfo found in root loader')

	return (
		<div className="flex min-h-screen flex-col justify-between">
			<NavigationBar />

			<div className="flex-1">
				<Outlet />
			</div>

			<Footer />
			{/* <div className="container flex justify-between py-10">
				<Logo />
				<ThemeSwitch userPreference={data.requestInfo.userPrefs.theme} />
			</div> */}
		</div>
	)
}
