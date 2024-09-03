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
import { Input } from '#app/components/ui/input.js'
import { Sheet, SheetTrigger, SheetContent } from '#app/components/ui/sheet.js'
import { requireUserId } from '#app/utils/auth.server.js'
import { getUserImgSrc } from '#app/utils/misc.js'
import { useUser } from '#app/utils/user.js'
import Notifications from './resources+/notifications'
import { type IconName } from '@/icon-name'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserId(request)
	return json({})
}

const links: {
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
							{links.map((link) => (
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
								{links.map((link) => (
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
						<form>
							<div className="relative">
								<Icon
									name="magnifying-glass"
									className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
								/>
								<Input
									type="search"
									placeholder="Search products..."
									className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
								/>
							</div>
						</form>
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
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<Link to="/settings/profile">
								<DropdownMenuItem>Settings</DropdownMenuItem>
							</Link>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>

				<main className="p-4 lg:gap-6 lg:p-6">
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
