import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher } from '@remix-run/react'
import { z } from 'zod'
import { ErrorList } from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Switch } from '~/components/ui/switch.tsx'
import { Checkbox } from '~/components/ui/checkbox.tsx'

// const ROUTE_PATH = '/resources/settings/notifications'
const ROUTE_PATH = '/resources/theme'

const NotificationFormSchema = z.object({
  redirectTo: z.string().optional(),
})

export function NotificationForm() {
  const fetcher = useFetcher()

  const [form] = useForm({
    id: 'notification-form',
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: NotificationFormSchema })
    },
  })

  return (
    <fetcher.Form method="POST" action={ROUTE_PATH} {...form.props}>
      <div className="flex gap-2">
        <div className="w-1/2 space-y-8">
          <div>
            <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <h3 className="text-sm font-medium">Communication emails</h3>
                <p className="text-xs text-muted-foreground">
                  Receive emails about your account activity.
                </p>
              </div>
              <Switch checked={false} />
            </div>
            <div className="flex  flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <h3 className="text-sm font-medium">Marketing emails</h3>
                <p className="text-xs text-muted-foreground">
                  Receive emails about new products, features, and more.
                </p>
              </div>
              <Switch checked={false} />
            </div>
            <div className="flex  flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <h3 className="text-sm font-medium">Social emails</h3>
                <p className="text-xs text-muted-foreground">
                  Receive emails for friend requests, follows and more.
                </p>
              </div>
              <Switch checked={false} />
            </div>
            <div className="flex  flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <h3 className="text-sm font-medium">Security emails</h3>
                <p className="text-xs text-muted-foreground">
                  Receive emails about your account activity and security.
                </p>
              </div>
              <Switch checked={true} disabled />
            </div>
          </div>
          <div className="flex flex-row items-start space-x-3 space-y-0">
            <Checkbox checked={false} />
            <div className="space-y-1 leading-none">
              <h3 className="text-sm font-medium">
                Use different settings for my mobile devices
              </h3>
              <p className="text-xs text-muted-foreground">
                You can manage your mobile notifications in the mobile app.
              </p>
            </div>
          </div>

          <Button type="submit">Update notifications</Button>
        </div>
      </div>
      <ErrorList errors={form.errors} id={form.errorId} />
    </fetcher.Form>
  )
}
