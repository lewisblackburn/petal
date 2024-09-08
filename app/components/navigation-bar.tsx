import { Link } from '@remix-run/react'
import { Logo } from './logo'
import { Button } from './ui/button'
import { Icon } from './ui/icon'
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from './ui/sheet'

const links = [
	{
		name: 'Home',
		href: '/',
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
							<Link to={link.href}>{link.name}</Link>
						</li>
					))}
				</ul>
				<div className="hidden justify-end gap-4 xl:flex">
					<Link to="/login?redirectTo=/dashboard">
						<Button variant="outline">Sign in</Button>
					</Link>
					<Link to="/signup?redirectTo=/dashboard">
						<Button>Start for free</Button>
					</Link>
				</div>
				<div className="flex justify-end xl:hidden">
					<MobileNavigation />
				</div>
			</div>
		</nav>
	)
}

function MobileNavigation() {
	return (
		<Sheet>
			<SheetTrigger>
				<Icon name="hamburger-menu" className="h-6 w-6" />
			</SheetTrigger>
			<SheetContent className="flex h-full flex-col">
				{/* Sheet links the same as navbar */}
				<ul className="flex flex-grow flex-col gap-4">
					{links.map((link) => (
						<li key={link.href}>
							<Link to={link.href}>{link.name}</Link>
						</li>
					))}
				</ul>
				<SheetFooter className="mt-auto">
					<div className="grid w-full grid-cols-2 gap-4">
						<Link to="/login?redirectTo=/dashboard">
							<Button variant="outline" className="w-full">
								Sign in
							</Button>
						</Link>

						<Link to="/signup?redirectTo=/dashboard">
							<Button className="w-full">Start for free</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
