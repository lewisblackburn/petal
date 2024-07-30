import { Form, Link, NavLink, useLocation, useSubmit } from '@remix-run/react'
import React, { useRef } from 'react'
import { cn, getUserImgSrc } from '#app/utils/misc.js'
import { useOptionalUser, useUser, userHasRole } from '#app/utils/user.js'
import { SearchBar } from '../search-bar'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '../ui/dropdown-menu'
import { Icon } from '../ui/icon'
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from '../ui/navigation-menu'

export default function Navbar() {
	const user = useOptionalUser()
	const pathname = useLocation().pathname

	return (
		<nav className="bg-background">
			<div className="border-b py-6">
				<div className="container flex items-center justify-between">
					<Link to="/">
						<h1 className="font-bold transition-colors hover:text-primary">
							Spotlist
						</h1>
					</Link>
					<div className="flex items-center gap-5">
						<div className="w-[300px]">
							<SearchBar status="idle" />
						</div>
						{user ? (
							<>
								<AddMediaDropdown />
								<UserDropdown />
							</>
						) : (
							<Button asChild variant="default" size="sm">
								<Link to={`/login?redirectTo=${pathname}`}>Log In</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
			<div className="py-2 shadow">
				<div className="container">
					<NavigationMenuDemo />
				</div>
			</div>
		</nav>
	)
}

const links: {
	title: string
	href?: string
	admin?: boolean
	components?: {
		admin?: boolean
		title: string
		href: string
		description: string
	}[]
}[] = [
	{
		title: 'Movies',
		href: '/films',
	},
	{
		title: 'TV Shows',
		href: '/shows',
	},
	{
		title: 'People',
		href: '/people',
	},
	{
		title: 'Books',
		href: '/books',
	},
	{
		title: 'Music',
		href: '/music',
	},
	{
		title: 'Games',
		href: '/games',
	},
	{
		title: 'Dashboard',
		admin: true,
		components: [
			{
				title: 'Overview',
				href: '/admin/dashboard',
				description: 'View the dashboard overview.',
			},
			{
				title: 'Manage Movies',
				href: '/admin/dashboard/films',
				description: 'Manage the movies in the database.',
			},
			{
				title: 'Manage Users',
				href: '/admin/dashboard/users',
				description: 'Manage the users in the database.',
			},
		],
	},
	{
		title: 'Resources',
		components: [
			{
				title: 'Contribution Bible',
				href: '/contribution-bible',
				description: 'Learn how to contribute to Spotlist.',
			},
			{
				title: 'API',
				href: '/api',
				description: 'The API documentation for Spotlist.',
			},
			{
				title: 'Support',
				href: '/support',
				description: 'Get help with Spotlist.',
			},
			{
				title: 'Contact',
				href: '/contact',
				description: 'Contact the Spotlist team.',
			},
			{
				title: 'About',
				href: '/about',
				description: 'Learn more about Spotlist.',
			},
		],
	},
]

function NavigationMenuDemo() {
	const user = useOptionalUser()
	const userIsAdmin = user && userHasRole(user, 'admin')

	return (
		<NavigationMenu className="[&>.absolute]:-right-3 [&>.absolute]:left-auto [&>.absolute]:mt-5">
			<NavigationMenuList>
				{links.map((link) => {
					if (link.admin && !userIsAdmin) return null

					return (
						<NavigationMenuItem key={link.title}>
							{link.href ? (
								<NavLink
									to={link.href}
									className={({ isActive }) =>
										cn(
											navigationMenuTriggerStyle(),
											isActive && 'bg-accent text-accent-foreground',
										)
									}
								>
									{link.title}
								</NavLink>
							) : (
								<>
									<NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
									{link.components && (
										<NavigationMenuContent>
											<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
												{link.components.map((component) => (
													<ListItem
														key={component.title}
														title={component.title}
														href={component.href}
													>
														{component.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									)}
								</>
							)}
						</NavigationMenuItem>
					)
				})}
			</NavigationMenuList>
		</NavigationMenu>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'

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
						onClick={(e) => e.preventDefault()}
						className="flex items-center gap-2"
					>
						<Avatar className="h-8 w-8">
							<AvatarImage
								className="object-cover"
								src={getUserImgSrc(user.image?.id)}
								alt={user.name ?? user.username}
							/>
							{/* @ts-ignore: initials will exist it just doesn't show in type as it is an extension */}
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
						onSelect={(event) => {
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
