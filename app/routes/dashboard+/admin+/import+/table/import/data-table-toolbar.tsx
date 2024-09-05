import { type Table } from '@tanstack/react-table'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { Input } from '#app/components/ui/input.tsx'
import { DataTableViewOptions } from '#app/components/table/data-table-view-options.js'
import { DataTableImport } from './data-table-import'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered =
		table.getState().columnFilters.length > 0 || table.getState().globalFilter

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter TMDB films..."
					value={table.getState().globalFilter ?? ''}
					onChange={(event) => table.setGlobalFilter(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => {
							table.resetColumnFilters()
							table.resetGlobalFilter()
						}}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<Icon name="cross-1" className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<div className="flex flex-1 items-center space-x-2">
				<DataTableViewOptions table={table} />
				<DataTableImport table={table} />
			</div>
		</div>
	)
}
