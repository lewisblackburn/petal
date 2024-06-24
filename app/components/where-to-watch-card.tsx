import React from 'react'
import { Button } from './ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from './ui/collapsible'
import { Icon } from './ui/icon'

export function WhereToWatchCard() {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="w-[300px] space-y-2"
		>
			<div className="flex items-center justify-between space-x-4 rounded-md border py-1 pl-4 pr-1 font-mono text-sm">
				<h4 className="text-sm font-semibold">Where To Watch</h4>
				<CollapsibleTrigger asChild>
					<Button variant="ghost" size="sm" className="w-9 p-0">
						<Icon name="caret-sort" className="h-4 w-4" />
						<span className="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent className="space-y-2">
				<div className="rounded-md border px-4 py-3 font-mono text-sm">
					<p>magna pars studiorum, prodita quaerimus.</p>
					<p>nec dubitamus multa iter quae et nos invenerat.</p>
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}
