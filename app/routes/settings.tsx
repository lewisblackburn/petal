import { json, type DataFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { Container } from '~/components/container.tsx'
import ButtonGroup from '~/components/ui/button-group.tsx'
import { authenticator, requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'

export async function loader({ request }: DataFunctionArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			username: true,
		},
	})
	if (!user) {
		throw await authenticator.logout(request, { redirectTo: '/' })
	}
	return json({})
}

const NavigationLinks: { name: string; path: string }[] = [
	{ name: 'Appearance', path: 'appearance' },
	{ name: 'Profile', path: 'profile' },
	{ name: 'Password', path: 'password' },
	{ name: 'Team', path: 'team' },
	{ name: 'Sessions', path: 'sessions' },
	{ name: 'Billing', path: 'billing' },
	{ name: 'Notifications', path: 'notifications' },
	{ name: 'Integrations', path: 'integrations' },
	{ name: 'API', path: 'api' },
]

export default function Settings() {
	return (
		<Container>
			<div className="mb-5">
				<h2 className="text-2xl font-bold tracking-tight">Settings</h2>
				<p className="text-muted-foreground">
					Manage your account settings and set preferences.
				</p>
			</div>
			<div className="mb-16">
				<ButtonGroup pages={NavigationLinks} />
			</div>
			<main>
				<Outlet />
			</main>
		</Container>
	)
}
