import { Link, NavLink } from '@remix-run/react'
import { cn } from '~/utils/misc.tsx'
import { useOptionalUser } from '~/utils/user.ts'
import { AddMediaDropdown } from './add-media-dropdown.tsx'
import { NotificationPopover } from './notification-popover.tsx'
import { SearchBar } from './search-bar.tsx'
import { Button } from './ui/button.tsx'
import { UserDropdown } from './user-dropdown.tsx'

const LINKS = [
	{
		href: '/films',
		label: 'Films',
	},
	{
		href: '/television',
		label: 'Television',
	},
	{
		href: '/people',
		label: 'People',
	},
	{
		href: '/books',
		label: 'Books',
	},
	{
		href: '/music',
		label: 'Music',
	},
]

export function Header() {
	const user = useOptionalUser()

	return (
		<div className="flex flex-col">
			<div className="border-b">
				<div className="mx-auto flex h-16 max-w-7xl items-center">
					<nav className="flex items-center space-x-4 lg:space-x-6">
						<NavLink
							to="/"
							className={({ isActive }) =>
								cn(
									'text-sm font-bold transition-colors hover:text-primary',
									isActive && 'text-primary',
								)
							}
						>
							Petal
						</NavLink>
						{LINKS.map(({ href, label }) => (
							<NavLink
								key={href}
								to={href}
								className={({ isActive }) =>
									cn(
										'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
										isActive && 'text-primary',
									)
								}
							>
								{label}
							</NavLink>
						))}
					</nav>
					<div className="ml-auto flex items-center space-x-4">
						<SearchBar action="/films" status="idle" />
						{user ? (
							<>
								<div>
									<AddMediaDropdown />
									<NotificationPopover />
								</div>
								<UserDropdown />
							</>
						) : (
							<Button asChild variant="default" size="sm">
								<Link to="/login">Log In</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
