import { type Table } from '@tanstack/react-table'

import { Input } from '~/components/ui/input.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Icon } from '~/components/ui/icon.tsx'
import { DataTableFacetedFilter } from '~/components/table/data-table-faceted-filter.tsx'
import { DataTableViewOptions } from '~/components/table/data-table-view-options.tsx'
import { DataTableAddPerson } from './data-table-add-person.js'
import { CreditDepartments, CreditJobs } from '~/utils/credit-roles.ts'

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
					placeholder="Filter credit members..."
					value={
						(table.getColumn('character')?.getFilterValue() as string) ?? ''
					}
					onChange={event =>
						table.getColumn('character')?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn('department') && (
					<DataTableFacetedFilter
						column={table.getColumn('department')}
						title="Department"
						options={CreditDepartments}
					/>
				)}
				{table.getColumn('job') && (
					<DataTableFacetedFilter
						column={table.getColumn('job')}
						title="Job"
						options={CreditJobs}
					/>
				)}
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
				<DataTableAddPerson />
			</div>
		</div>
	)
}
