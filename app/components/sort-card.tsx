import queryString from 'querystring'
import { useSearchParams } from '@remix-run/react'
import React from 'react'
import { type Sort } from '#app/utils/request.helper'
import { Button } from './ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from './ui/collapsible'
import { Icon } from './ui/icon'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

export function SortCard() {
	const [isOpen, setIsOpen] = React.useState(false)

	const SORT_OPTIONS = [
		{ label: 'Title (A-Z)', value: { orderBy: 'title', order: 'asc' } },
		{ label: 'Title (A-Z)', value: { orderBy: 'title', order: 'desc' } },
		{ label: 'Popularity Ascending', value: 'popularity_asc' },
		{ label: 'Popularity Descending', value: 'popularity_desc' },
		{ label: 'Rating Ascending', value: 'rating_asc' },
		{ label: 'Rating Descending', value: 'rating_desc' },
		{ label: 'Release Date Ascending', value: 'release_date_asc' },
		{ label: 'Release Date Descending', value: 'release_date_desc' },
	]

	const [params, setParams] = useSearchParams()
	const handleSort = (order: Sort) => {
		const existingParams = queryString.parse(params.toString())
		setParams(queryString.stringify({ ...existingParams, ...order }))
	}

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
					<Select
						onValueChange={value => {
							const parsedValue = JSON.parse(value) as Sort
							handleSort({
								orderBy: parsedValue.orderBy,
								order: parsedValue.order,
							})
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Sort Results By" />
						</SelectTrigger>
						<SelectContent>
							{SORT_OPTIONS.map(option => (
								<SelectItem
									key={JSON.stringify(option.value)}
									value={JSON.stringify(option.value)}
								>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}
