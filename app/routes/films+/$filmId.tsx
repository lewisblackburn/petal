import { Outlet, useNavigate } from '@remix-run/react'
import { Icon } from '#app/components/ui/icon.tsx'

export default function FilmLayout() {
	const navigate = useNavigate()

	return (
		<div>
			<div className="flex h-16 items-center border-b">
				<div className="container py-6">
					<button
						className="flex items-center gap-2"
						onClick={() => navigate(-1)}
					>
						<Icon name="arrow-left" />
						<span>Back</span>
					</button>
				</div>
			</div>
			<Outlet />
		</div>
	)
}
