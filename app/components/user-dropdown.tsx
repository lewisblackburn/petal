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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx'
import { Button } from './ui/button.tsx'
import { useUser } from '~/utils/user.ts'
import { getUserImgSrc } from '~/utils/misc.ts'
import { Form, Link, useSubmit } from '@remix-run/react'
import { useRef } from 'react'

export function UserDropdown() {
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
							src={getUserImgSrc(user.imageId)}
							alt={user.name ?? user.username}
						/>{' '}
						{/*  TODO: Add fallback to user initials */}
						<AvatarFallback>SC</AvatarFallback>
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
