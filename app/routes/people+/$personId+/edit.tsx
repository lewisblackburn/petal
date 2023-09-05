import { Outlet } from '@remix-run/react'
import ButtonGroup from '#app/components/ui/button-group.tsx'

const NavigationLinks: { name: string; path: string }[] = [
  { name: 'Primary Facts', path: '' },
  { name: 'Alternative Names', path: 'alternative' },
  { name: 'External Links', path: 'links' },
  { name: 'Photo', path: 'photo' },
]

export default function PersonEditLayout() {
  return (
    <div className="container py-6">
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
    </div>
  )
}
