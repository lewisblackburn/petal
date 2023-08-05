import { type Table } from '@tanstack/react-table'

import { Input } from '~/components/ui/input.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Icon } from '~/components/ui/icon.tsx'
import { DataTableViewOptions } from '~/components/table/data-table-view-options.tsx'
import { DataTableAddCastMember } from './data-table-add-cast-member.tsx'
import { DataTableDeleteCastMembers } from './data-table-delete-cast-members.tsx'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter cast members..."
					value={table.getState().globalFilter ?? ''}
					onChange={event => table.setGlobalFilter(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<Icon name="cross-1" className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<div className="flex flex-1 items-center space-x-2">
				<DataTableViewOptions table={table} />
				<DataTableAddCastMember />
				<DataTableDeleteCastMembers table={table} />
			</div>
		</div>
	)
}
