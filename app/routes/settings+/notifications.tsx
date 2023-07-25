import { json, type DataFunctionArgs } from '@remix-run/node'
import { NotificationForm } from '~/components/notification-form.tsx'
import { Separator } from '~/components/ui/separator.tsx'
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

export default function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <NotificationForm />
    </div>
  )
}
