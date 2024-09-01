import { Link } from '@remix-run/react'

export function Logo() {
	return (
		<Link to="/" className="group flex items-center gap-3 leading-snug">
			<div className="relative h-6 w-6">
				<div className="absolute inset-0 rounded-full bg-primary opacity-30"></div>
				<div className="absolute inset-0 left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-primary opacity-60"></div>
				<div className="absolute inset-0 left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-primary opacity-100"></div>
			</div>
			<span className="text-lg font-bold tracking-wide transition">Petal</span>
		</Link>
	)
}
