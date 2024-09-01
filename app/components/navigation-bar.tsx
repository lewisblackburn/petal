import { Link } from '@remix-run/react'
import { Logo } from './logo'
import { Button } from './ui/button'

const links = [
	{
		name: 'Case Studies',
		href: '/case-studies',
	},
	{
		name: 'Integrations',
		href: '/integrations',
	},
	{
		name: 'Pricing',
		href: '/pricing',
	},
	{
		name: 'Documentation',
		href: '/documentation',
	},
]

export default function NavigationBar() {
	return (
		<nav className="grid grid-cols-3 items-center border-b border-border px-10 py-4">
			<div className="justify-start">
				<Logo />
			</div>
			<ul className="flex justify-center gap-10 text-sm font-semibold">
				{links.map((link) => (
					<li key={link.href}>
						<a href={link.href}>{link.name}</a>
					</li>
				))}
			</ul>
			<div className="flex justify-end gap-4">
				<Link to="/">
					<Button variant="outline">Sign in</Button>
				</Link>
				<Link to="/">
					<Button>Start for free</Button>
				</Link>
			</div>
		</nav>
	)
}
