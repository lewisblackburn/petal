import { Outlet, useLocation, useNavigate } from '@remix-run/react'
import { Icon } from '#app/components/ui/icon.tsx'

export default function FilmLayout() {
	const location = useLocation()
	const navigate = useNavigate()

	const handleClick = () => {
		const parts = location.pathname.split('/')
		parts.pop()
		const newPath = parts.join('/')
		navigate(newPath)
	}

	return (
		<div>
			<div className="flex h-16 items-center border-b">
				<div className="container py-6">
					<button className="flex items-center gap-2" onClick={handleClick}>
						<Icon name="arrow-left" />
						<span>Back</span>
					</button>
				</div>
			</div>
			<Outlet />
		</div>
	)
}
