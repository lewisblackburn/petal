import { Link, useLocation } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useSidebar } from '#app/hooks/useSidebar'
import { cn } from '#app/utils/misc'
import { buttonVariants } from '../ui/button'
import { Icon, type IconName } from '../ui/icon'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './sub-nav-accordian'

export interface NavItem {
	title: string
	href: string
	icon: IconName
	color?: string
	isChidren?: boolean
	children?: NavItem[]
}

export const NavItems: NavItem[] = [
	{
		title: 'Dashboard',
		icon: 'folder',
		href: '/admin/dashboard',
		color: 'text-primary',
	},
	{
		title: 'Users',
		icon: 'person',
		href: '/admin/dashboard/users',
		color: 'text-primary',
		isChidren: true,
		children: [
			{
				title: 'Search',
				icon: 'magnifying-glass',
				color: 'text-primary',
				href: '/admin/dashboard/users',
			},
			{
				title: 'Roles',
				icon: 'person',
				color: 'text-primary',
				href: '/admin/dashboard/countries',
			},
			{
				title: 'Permissions',
				icon: 'pencil-1',
				color: 'text-primary',
				href: '/admin/dashboard/countries',
			},
		],
	},
	{
		title: 'Films',
		icon: 'film',
		href: '/admin/dashboard/films',
		color: 'text-primary',
	},
	{
		title: 'Television',
		icon: 'tv',
		href: '/admin/dashboard/television',
		color: 'text-primary',
	},
	{
		title: 'People',
		icon: 'person',
		href: '/admin/dashboard/people',
		color: 'text-primary',
	},
	{
		title: 'Books',
		icon: 'book-open',
		href: '/admin/dashboard/books',
		color: 'text-primary',
	},
	{
		title: 'Music',
		icon: 'musical-note',
		href: '/admin/dashboard/music',
		color: 'text-primary',
	},
	{
		title: 'Countries',
		icon: 'globe',
		color: 'text-primary',
		href: '/admin/dashboard/countries',
	},
	{
		title: 'Languages',
		icon: 'language',
		color: 'text-primary',
		href: '/admin/dashboard/countries',
	},
	{
		title: 'Genres',
		icon: 'book-open',
		color: 'text-primary',
		href: '/admin/dashboard/countries',
	},
	{
		title: 'Production Companies',
		icon: 'film',
		color: 'text-primary',
		href: '/admin/dashboard/countries',
	},
]

interface SideNavProps {
	items: NavItem[]
	setOpen?: (open: boolean) => void
	className?: string
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
	const path = useLocation().pathname
	const { isOpen } = useSidebar()
	const [openItem, setOpenItem] = useState('')
	const [lastOpenItem, setLastOpenItem] = useState('')

	useEffect(() => {
		if (isOpen) {
			setOpenItem(lastOpenItem)
		} else {
			setLastOpenItem(openItem)
			setOpenItem('')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])

	return (
		<nav className="space-y-2">
			{items.map(item =>
				item.isChidren ? (
					<Accordion
						type="single"
						collapsible
						className="space-y-2"
						key={item.title}
						value={openItem}
						onValueChange={setOpenItem}
					>
						<AccordionItem value={item.title} className="border-none">
							<AccordionTrigger
								className={cn(
									buttonVariants({ variant: 'ghost' }),
									'group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline',
								)}
							>
								<div>
									<Icon
										name={item.icon}
										className={cn('h-5 w-5', item.color)}
									/>
								</div>
								<div
									className={cn(
										'absolute left-12 text-base duration-200',
										!isOpen && className,
									)}
								>
									{item.title}
								</div>

								{isOpen && (
									<Icon
										name="chevron-down"
										className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
									/>
								)}
							</AccordionTrigger>
							<AccordionContent className="ml-4 mt-2 space-y-2 pb-1">
								{item.children?.map(child => (
									<Link
										key={child.title}
										to={child.href}
										onClick={() => {
											if (setOpen) setOpen(false)
										}}
										className={cn(
											buttonVariants({ variant: 'ghost' }),
											'group flex h-12 justify-start gap-x-3',
											path === child.href &&
												'bg-muted font-bold hover:bg-muted',
										)}
									>
										{/* Use child.icon aqui em vez de item.icon */}
										<Icon
											name={child.icon}
											className={cn('h-5 w-5', child.color)}
										/>
										<div
											className={cn(
												'text-base duration-200',
												!isOpen && className,
											)}
										>
											{child.title}
										</div>
									</Link>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				) : (
					<Link
						key={item.title}
						to={item.href}
						onClick={() => {
							if (setOpen) setOpen(false)
						}}
						className={cn(
							buttonVariants({ variant: 'ghost' }),
							'group relative flex h-12 justify-start',
							path === item.href && 'bg-muted font-bold hover:bg-muted',
						)}
					>
						<Icon name={item.icon} className={cn('h-5 w-5', item.color)} />
						<span
							className={cn(
								'absolute left-12 text-base duration-200',
								!isOpen && className,
							)}
						>
							{item.title}
						</span>
					</Link>
				),
			)}
		</nav>
	)
}
