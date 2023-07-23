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
  { name: 'Appearance', path: '/settings/appearance' },
  { name: 'Profile', path: '/settings/profile' },
  { name: 'Password', path: '/settings/password' },
  { name: 'Team', path: '/settings/team' },
  { name: 'Sessions', path: '/settings/sessions' },
  { name: 'Billing', path: '/settings/billing' },
  { name: 'Notifications', path: '/settings/notifications' },
  { name: 'Integrations', path: '/settings/integrations' },
  { name: 'API', path: '/settings/api' },
]

export default function NotificationSettings() {
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
