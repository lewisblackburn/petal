import { Link, Outlet, useLocation, useParams } from '@remix-run/react'
import { Container } from '~/components/container.tsx'
import { Icon } from '~/components/ui/icon.tsx'

export default function PersonLayout() {
	const path = useLocation().pathname
	const { personId } = useParams()
	const isInEditMode = path.includes('edit')

	return (
		<div>
			<div className="flex h-16 items-center border-b">
				<Container>
					<Link
						to={isInEditMode ? `/people/${personId}` ?? '/people' : '/people'}
						className="flex items-center space-x-3 font-bold"
					>
						<Icon name="arrow-left" />
						<span>Back to {isInEditMode ? 'person' : 'people'}</span>
					</Link>
				</Container>
			</div>
			<Outlet />
		</div>
	)
}
