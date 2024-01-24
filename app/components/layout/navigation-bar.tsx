import { Form, Link, NavLink, useLocation, useSubmit } from '@remix-run/react'
import { useRef } from 'react'
import { cn, getUserImgSrc } from '#app/utils/misc'
import { userHasRole } from '#app/utils/permissions'
import { useOptionalUser, useUser } from '#app/utils/user'
import { SearchBar } from '../search-bar'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Icon } from '../ui/icon'

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

export default function NavigationBar({
	isOnDashboardPage,
}: {
	isOnDashboardPage?: boolean
}) {
	const user = useOptionalUser()
	const pathname = useLocation().pathname

	return (
		<div
			className={cn(
				'supports-backdrop-blur:bg-background/60 left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur',
				isOnDashboardPage && 'fixed',
			)}
		>
			<nav
				className={cn(
					'flex h-16 items-center justify-between',
					!isOnDashboardPage && 'container',
					isOnDashboardPage && 'pl-5 pr-4',
				)}
			>
				<div className="flex items-center space-x-4 lg:space-x-6">
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
				</div>
				{/* <div className={cn('block md:!hidden')}> */}
				{/* 	<MobileSidebar /> */}
				{/* </div> */}

				<div className="flex items-center gap-5">
					{user ? (
						<>
							<div className="w-[300px]">
								<SearchBar status="idle" />
							</div>
							<AddMediaDropdown />
							<UserDropdown />
						</>
					) : (
						<>
							<div className="w-[300px]">
								<SearchBar status="idle" />
							</div>
							<Button asChild variant="default" size="sm">
								<Link to={`/login?redirectTo=${pathname}`}>Log In</Link>
							</Button>
						</>
					)}
				</div>
			</nav>
		</div>
	)
}

export function UserDropdown() {
	const user = useUser()
	const userIsAdmin = userHasRole(user, 'admin')
	const submit = useSubmit()
	const formRef = useRef<HTMLFormElement>(null)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button asChild variant="secondary">
					<Link
						to={`/users/${user.username}`}
						// this is for progressive enhancement
						onClick={e => e.preventDefault()}
						className="flex items-center gap-2"
					>
						<Avatar className="h-8 w-8">
							<AvatarImage
								className="object-cover"
								src={getUserImgSrc(user.image?.id)}
								alt={user.name ?? user.username}
							/>
							<AvatarFallback>{user.initials}</AvatarFallback>
						</Avatar>
						<span className="text-body-sm font-bold">
							{user.name ?? user.username}
						</span>
					</Link>
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
				{userIsAdmin && (
					<>
						<DropdownMenuGroup>
							<Link to="/admin/dashboard">
								<DropdownMenuItem>Dashboard</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
					</>
				)}
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

export function AddMediaDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Icon name="plus" className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="center" forceMount>
				<DropdownMenuGroup>
					<Link to="/films/new">
						<DropdownMenuItem>
							<Icon name="film" className="mr-2 h-4 w-4" />
							Film
						</DropdownMenuItem>
					</Link>
					<Link to="/television/new">
						<DropdownMenuItem>
							<Icon name="tv" className="mr-2 h-4 w-4" />
							Televsion Show
						</DropdownMenuItem>
					</Link>
					<Link to="/people/new">
						<DropdownMenuItem>
							<Icon name="person" className="mr-2 h-4 w-4" />
							Person
						</DropdownMenuItem>
					</Link>
					<Link to="/books/new">
						<DropdownMenuItem>
							<Icon name="book-open" className="mr-2 h-4 w-4" />
							Book
						</DropdownMenuItem>
					</Link>
					<Link to="/songs/new">
						<DropdownMenuItem>
							<Icon name="musical-note" className="mr-2 h-4 w-4" />
							Song
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
