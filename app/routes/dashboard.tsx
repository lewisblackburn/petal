import { requireUserId } from '#app/utils/auth.server.js'
import { requireUserWithRole } from '#app/utils/permissions.server.js'
import { SEOHandle } from '@nasa-gcn/remix-seo'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserId(request)
	return json({})
}

export default function DashboardPageLayout() {
	return (
		<div>
			<Outlet />
		</div>
	)
}
