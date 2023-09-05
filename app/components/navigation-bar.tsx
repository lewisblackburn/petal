import { Form, Link, NavLink, useMatches, useSubmit } from '@remix-run/react'
import { useRef } from 'react'
import { cn, getUserImgSrc } from '#app/utils/misc.tsx'
import { useOptionalUser, useUser } from '#app/utils/user.ts'
import { SearchBar } from './search-bar.tsx'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx'
import { Button } from './ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from './ui/dropdown-menu.tsx'

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

export function NavigationBar() {
	const user = useOptionalUser()
	const matches = useMatches()
	const isOnSearchPage = matches.find(m => m.id === 'routes/users+/index')

	return (
		<div className="flex items-center border-b">
			<header className="container py-3">
				<nav className="flex items-center justify-between">
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
					{isOnSearchPage ? null : (
						<div className="ml-auto max-w-sm flex-1 pr-10">
							<SearchBar status="idle" />
						</div>
					)}
					<div className="flex items-center gap-10">
						{user ? (
							<UserDropdown />
						) : (
							<Button asChild variant="default" size="sm">
								<Link to="/login">Log In</Link>
							</Button>
						)}
					</div>
				</nav>
			</header>
		</div>
	)
}

function UserDropdown() {
	const user = useUser()
	const submit = useSubmit()
	const formRef = useRef<HTMLFormElement>(null)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage
							className="object-cover"
							src={getUserImgSrc(user.image?.id)}
							alt={user.name ?? user.username}
						/>
						{/* TODO: Make this compute initials */}
						<AvatarFallback>LB</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="center" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{user.name ?? user.username}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link to="/settings/profile">
						<DropdownMenuItem>
							Settings
							<DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
					<Link to={`/users/${user.username}`}>
						<DropdownMenuItem>
							Profile
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
					<Link to={`/users/${user.username}/notes`}>
						<DropdownMenuItem>
							Notes
							<DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<Form action="/logout" method="POST" ref={formRef}>
					<DropdownMenuItem
						// this prevents the menu from closing before the form submission is completed
						onSelect={event => {
							event.preventDefault()
							submit(formRef.current)
						}}
					>
						<button type="submit">Logout</button>
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</Form>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
