import { json, type DataFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { Container } from '~/components/container.tsx'
import ButtonGroup from '~/components/ui/button-group.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import { invariantResponse } from '~/utils/misc.tsx'

export async function loader({ request, params }: DataFunctionArgs) {
  invariantResponse(params.personId, 'Missing personId')
  await requireUserId(request)
  return json({})
}

const NavigationLinks: { name: string; path: string }[] = [
  { name: 'Primary Facts', path: '' },
  { name: 'Alternative Names', path: 'alternative' },
  { name: 'External Links', path: 'links' },
  { name: 'Photo', path: 'photo' },
]

export default function PersonEditLayout() {
  return (
    <Container>
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight">Edit Person</h2>
        <p className="text-muted-foreground">
          Edit the details of this person.
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
