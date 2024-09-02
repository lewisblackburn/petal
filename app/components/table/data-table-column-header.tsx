import { type Column } from '@tanstack/react-table'
import { cn } from '#app/utils/misc.js'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '../ui/dropdown-menu'
import { Icon } from '../ui/icon'

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>
	title: string
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>
	}

	return (
		<div className={cn('flex items-center space-x-2', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="-ml-3 h-8 data-[state=open]:bg-accent"
					>
						<span>{title}</span>
						{column.getIsSorted() === 'desc' ? (
							<Icon name="arrow-down" className="ml-2 h-4 w-4" />
						) : column.getIsSorted() === 'asc' ? (
							<Icon name="arrow-up" className="ml-2 h-4 w-4" />
						) : (
							<Icon name="caret-sort" className="ml-2 h-4 w-4" />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<Icon
							name="arrow-up"
							className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
						/>
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<Icon
							name="arrow-down"
							className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
						/>
						Desc
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
						<Icon
							name="eye-none"
							className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
						/>
						Hide
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
