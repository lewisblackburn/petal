import { type Table } from '@tanstack/react-table'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { Input } from '#app/components/ui/input.tsx'
import { COUNTRIES } from '#app/utils/constants.ts'
import { DataTableFacetedFilter } from '../../data-table-faceted-filter.tsx'
import { DataTableViewOptions } from '../../data-table-view-options.tsx'
import { DataTableAddReleaseInformation } from './data-table-add-release-information.tsx'
import { DataTableDeleteReleaseInformation } from './data-table-delete-release-information.tsx'

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
					placeholder="Filter release information..."
					value={table.getState().globalFilter ?? ''}
					onChange={event => table.setGlobalFilter(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{/* NOTE: I have decided to keep countries as both in the database
				and in a static array as it allows me to search statically
				and search for models via country if needed as well*/}
				{table.getColumn('country') && (
					<DataTableFacetedFilter
						column={table.getColumn('country')}
						title="Country"
						options={COUNTRIES.map(country => ({
							label: country.name,
							value: country.name,
						}))}
					/>
				)}
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
				<DataTableAddReleaseInformation />
				<DataTableDeleteReleaseInformation table={table} />
			</div>
		</div>
	)
}
