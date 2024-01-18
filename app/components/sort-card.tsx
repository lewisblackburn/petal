import React from 'react'
import { SelectField } from './forms'
import { Button } from './ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from './ui/collapsible'
import { Icon } from './ui/icon'

export function SortCard() {
	const [isOpen, setIsOpen] = React.useState(true)
	const SORT_OPTIONS = [
		{ label: 'Title (A-Z)', value: 'title' },
		{ label: 'Popularity Ascending', value: 'popularity_asc' },
		{ label: 'Popularity Descending', value: 'popularity_desc' },
		{ label: 'Rating Ascending', value: 'rating_asc' },
		{ label: 'Rating Descending', value: 'rating_desc' },
		{ label: 'Release Date Ascending', value: 'release_date_asc' },
		{ label: 'Release Date Descending', value: 'release_date_desc' },
	]

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="w-[300px] space-y-2"
		>
			<div className="flex items-center justify-between space-x-4 rounded-md border py-1  pl-4 pr-1 font-mono text-sm">
				<h4 className="text-sm font-semibold">Sort</h4>
				<CollapsibleTrigger asChild>
					<Button variant="ghost" size="sm" className="w-9 p-0">
						<Icon name="caret-sort" className="h-4 w-4" />
						<span className="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent className="space-y-2">
				<div className="rounded-md border px-4 py-3 font-mono text-sm">
					<div className="flex-1">
						<SelectField
							labelProps={{
								children: 'Sort Results By',
								className: 'sr-only',
							}}
							buttonProps={{}}
							options={SORT_OPTIONS}
						/>
					</div>
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}
