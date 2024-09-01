import { Link } from '@remix-run/react'

export function Logo() {
	return (
		<Link to="/" className="group grid leading-snug">
			<span className="font-bold transition">Petal</span>
		</Link>
	)
}
