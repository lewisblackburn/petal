import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, NavLink, Outlet } from '@remix-run/react'
import { Logo } from '#app/components/logo.js'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '#app/components/ui/avatar.js'
import { Button } from '#app/components/ui/button.js'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from '#app/components/ui/dropdown-menu.js'
import { Icon } from '#app/components/ui/icon.js'
import { Sheet, SheetTrigger, SheetContent } from '#app/components/ui/sheet.js'
import Search from '#app/routes/resources+/search.js'
import { requireUserId } from '#app/utils/auth.server.js'
import { getUserImgSrc } from '#app/utils/misc.js'
import { useUser } from '#app/utils/user.js'
import Notifications from './resources+/notifications'
import { type IconName } from '@/icon-name'
import { Fragment } from 'react/jsx-runtime'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserId(request)
	return json({})
}

const sidebarLinks: {
	name: string
	href: string
	icon: IconName
}[] = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: 'home',
	},
	{
		name: 'Films',
		href: '/dashboard/films',
		icon: 'video',
	},
	{
		name: 'TV Shows',
		href: '/dashboard/series',
		icon: 'tv',
	},
	{
		name: 'People',
		href: '/dashboard/people',
		icon: 'users',
	},
	{
		name: 'Books',
		href: 'dashboard/books',
		icon: 'book-open',
	},
	{
		name: 'Music',
		href: '/dashboard/music',
		icon: 'audio-lines',
	},
	{
		name: 'Games',
		href: '/dashboard/games',
		icon: 'gamepad',
	},
	{
		name: 'Changes',
		href: '/dashboard/changes',
		icon: 'clock',
	},
]

const dropdownLinks = [
	{
		name: 'Admin',
		links: [
			{
				name: 'Import',
				href: '/dashboard/admin/import',
			},
		],
	},
	{
		name: 'Profile',
		links: [
			{
				name: 'Settings',
				href: '/settings',
			},
			{
				name: 'Support',
				href: '/support',
			},
		],
	},
	{
		name: 'Account',
		links: [
			{
				name: 'Logout',
				href: '/logout',
			},
		],
	},
]

export default function DashboardPageLayout() {
	const user = useUser()

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="fixed flex h-full max-h-screen flex-col gap-2 md:w-[220px] lg:w-[280px]">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Logo />
						<Notifications />
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							{sidebarLinks.map((link) => (
								<NavLink
									key={link.name}
									to={link.href}
									className={({ isActive, isPending }) =>
										isPending
											? ''
											: isActive
												? 'flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-colors'
												: 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
									}
									end
								>
									<Icon name={link.icon} className="mt-1 h-4 w-4" />
									<span>{link.name}</span>
								</NavLink>
							))}
						</nav>
					</div>
					<div className="mt-auto p-4">
						<LogoutButton />
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Icon name="hamburger-menu" className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium">
								<Logo />
								<div className="py-1" />
								{sidebarLinks.map((link) => (
									<NavLink
										key={link.name}
										to={link.href}
										className={({ isActive, isPending }) =>
											isPending
												? ''
												: isActive
													? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground'
													: 'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
										}
									>
										<Icon name={link.icon} className="h-5 w-5" />
										{link.name}
									</NavLink>
								))}
							</nav>
							<div className="mt-auto">
								<LogoutButton />
							</div>
						</SheetContent>
					</Sheet>
					<div className="w-full flex-1">
						<Search />
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								{user?.image ? (
									<Avatar className="h-5 w-5">
										<AvatarImage
											src={getUserImgSrc(user.image?.id)}
											alt={user.name ?? ''}
										/>
										<AvatarFallback>{user.initials}</AvatarFallback>
									</Avatar>
								) : (
									<Icon name="avatar" className="h-5 w-5" />
								)}
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-56">
							{dropdownLinks.map((group) => (
								<Fragment key={group.name}>
									<DropdownMenuLabel>{group.name}</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{group.links.map((link) => (
										<Link key={link.name} to={link.href}>
											<DropdownMenuItem>{link.name}</DropdownMenuItem>
										</Link>
									))}
									{/* if not last grouping then show separator */}
									{group !== dropdownLinks[dropdownLinks.length - 1] && (
										<DropdownMenuSeparator />
									)}
								</Fragment>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</header>

				<main className="container py-20">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

function LogoutButton() {
	return (
		<Form action="/logout" method="POST">
			<Button type="submit" variant="outline" className="w-full">
				<Icon name="exit" className="">
					Logout
				</Icon>
			</Button>
		</Form>
	)
}
