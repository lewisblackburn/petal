import { Link, Outlet, useLocation, useParams } from '@remix-run/react'
import { Icon } from '#app/components/ui/icon.tsx'

export default function PersonLayout() {
  const path = useLocation().pathname
  const { personId } = useParams()
  const isInEditMode = path.includes('edit')

  return (
    <div>
      <div className="flex h-16 items-center border-b">
        <div className="container py-6">
          <Link
            to={isInEditMode ? `/people/${personId}` : '/people'}
            className="flex items-center space-x-3 font-bold"
          >
            <Icon name="arrow-left" />
            <span>Back to {isInEditMode ? 'person' : 'people'}</span>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
