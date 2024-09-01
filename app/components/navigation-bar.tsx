import { Link } from '@remix-run/react'
import { Logo } from './logo'
import { Button } from './ui/button'

const links = [
	{
		name: 'Home',
		href: '/home',
	},
	{
		name: 'Features',
		href: '/features',
	},
	{
		name: 'Explore',
		href: '/explore',
	},
	{
		name: 'About Us',
		href: '/about',
	},
	{
		name: 'Contact',
		href: '/contact',
	},
]

export default function NavigationBar() {
	return (
		<nav className="border border-b">
			<div className="mx-auto grid max-w-[100rem] grid-cols-2 items-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:grid-cols-3">
				<div className="justify-start">
					<Logo />
				</div>
				<ul className="hidden justify-center gap-10 text-sm font-semibold xl:flex">
					{links.map((link) => (
						<li key={link.href}>
							<a href={link.href}>{link.name}</a>
						</li>
					))}
				</ul>
				<div className="hidden justify-end gap-4 xl:flex">
					<Link to="/">
						<Button variant="outline">Sign in</Button>
					</Link>
					<Link to="/">
						<Button>Start for free</Button>
					</Link>
				</div>
				<div className="flex justify-end xl:hidden">menu</div>
			</div>
		</nav>
	)
}
