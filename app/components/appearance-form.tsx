import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher } from '@remix-run/react'
import { z } from 'zod'
import { ErrorList } from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Label } from '~/components/ui/label.tsx'

const ROUTE_PATH = '/resources/theme'

const ThemeFormSchema = z.object({
  redirectTo: z.string().optional(),
  theme: z.enum(['light', 'dark']),
})

export function AppearanceForm() {
  const fetcher = useFetcher()

  const [form] = useForm({
    id: 'theme-switch',
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: ThemeFormSchema })
    },
  })

  return (
    <fetcher.Form method="POST" action={ROUTE_PATH} {...form.props}>
      <div className="flex gap-2">
        <div className="space-y-8">
          <div className="space-y-2">
            <div>
              <h3 className="text-md font-medium">Theme</h3>
              <p className="text-xs text-muted-foreground">
                Select the theme for the site.
              </p>
            </div>
            <div className="grid max-w-md grid-cols-2 gap-4 pt-2">
              <Label className="cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  className="hidden"
                />
                <div className="items-center rounded-md border-2 border-muted p-1 hover:bg-muted">
                  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal">
                  Light
                </span>
              </Label>
              <Label className="cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  className="hidden"
                />
                <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-muted hover:text-accent-foreground">
                  <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal">
                  Dark
                </span>
              </Label>
            </div>
          </div>

          <Button type="submit">Update preferences</Button>
        </div>
      </div>
      <ErrorList errors={form.errors} id={form.errorId} />
    </fetcher.Form>
  )
}
