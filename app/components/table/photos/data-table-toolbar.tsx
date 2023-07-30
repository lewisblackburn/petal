import { type Table } from '@tanstack/react-table'

import { Input } from '~/components/ui/input.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Icon } from '~/components/ui/icon.tsx'
import { DataTableViewOptions } from '~/components/table/data-table-view-options.tsx'
import { DataTableAddPhoto } from './data-table-add-photo.tsx'
import { DataTableDeletePhotos } from './data-table-delete-photos.tsx'
import { DataTableFacetedFilter } from '../data-table-faceted-filter.tsx'
import { PHOTO_TYPES, LANGUAGES } from '~/utils/constants.ts'

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
					placeholder="Filter photos..."
					value={table.getState().globalFilter ?? ''}
					onChange={event => table.setGlobalFilter(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn('type') && (
					<DataTableFacetedFilter
						column={table.getColumn('type')}
						title="Type"
						options={PHOTO_TYPES}
					/>
				)}

				{table.getColumn('language') && (
					<DataTableFacetedFilter
						column={table.getColumn('language')}
						title="Language"
						options={LANGUAGES}
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
				<DataTableAddPhoto />
				<DataTableDeletePhotos table={table} />
			</div>
		</div>
	)
}
