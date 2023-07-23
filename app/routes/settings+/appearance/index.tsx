import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { Separator } from '~/components/ui/separator.tsx'
import { authenticator, requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { AppearanceForm } from './appearance-form.tsx'

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

export default function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  )
}
