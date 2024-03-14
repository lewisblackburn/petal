import { NavLink, useLocation } from '@remix-run/react'
import React from 'react'
import { cn } from '#app/utils/misc.js'
import { Button } from './ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from './ui/collapsible'
import { Icon } from './ui/icon'

export function SearchCard() {
	const [isOpen, setIsOpen] = React.useState(true)
	const location = useLocation()

	const hasSearch = !!location.search

	if (!hasSearch) return null

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="w-[300px] space-y-2"
		>
			<div className="flex items-center justify-between space-x-4 rounded-md border py-1  pl-4 pr-1 font-mono text-sm">
				<h4 className="text-sm font-semibold">Search Results</h4>
				<CollapsibleTrigger asChild>
					<Button variant="ghost" size="sm" className="w-9 p-0">
						<Icon name="caret-sort" className="h-4 w-4" />
						<span className="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent>
				<div className="flex w-full flex-col space-y-4 rounded-md border p-4 font-mono text-sm">
					<NavLink
						to={`/films${location.search}`}
						className={({ isActive }) =>
							cn('w-full', isActive && 'text-blue-400')
						}
					>
						Films
					</NavLink>
					<NavLink
						to={`/people${location.search}`}
						className={({ isActive }) =>
							cn('w-full', isActive && 'text-blue-400')
						}
					>
						People
					</NavLink>
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}
