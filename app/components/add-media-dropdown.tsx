import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu.js'
import { Button } from './ui/button.js'
import { Link } from '@remix-run/react'
import { Icon } from './ui/icon.js'

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
