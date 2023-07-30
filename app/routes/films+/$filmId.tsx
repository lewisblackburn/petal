import { Link, Outlet, useLocation } from '@remix-run/react'
import { Container } from '~/components/container.tsx'
import { Icon } from '~/components/ui/icon.tsx'

export default function FilmLayout() {
	const path = useLocation().pathname

	return (
		<div>
			<div className="flex h-16 items-center border-b">
				<Container>
					<Link to=".." className="flex items-center space-x-3 font-bold">
						<Icon name="arrow-left" />
						<span>Back to {path.includes('edit') ? 'film' : 'films'}</span>
					</Link>
				</Container>
			</div>
			<Outlet />
		</div>
	)
}
