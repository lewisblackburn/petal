import { type Table } from '@tanstack/react-table'
import { Button } from '../ui/button.tsx'
import { Icon } from '../ui/icon.tsx'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select.tsx'

interface DataTablePaginationProps<TData> {
	table: Table<TData>
}

export function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	/*
	Create a dropdown list with page size options that increment by 10.
	The number of page size options is determined by dividing the total number of rows by 10 and
	rounding up to the nearest integer (Math.ceil(totalRows / 10)).
	Each page size represents a multiple of 10.
	For example, if there are 11 rows, the dropdown will show "10" and "20" as selectable options.
	If there are 25 rows, it will show "10", "20", and "30".
*/
	const totalRows = table.getFilteredRowModel().rows.length
	// If the table is empty, set the number of full pages to 1 to default to a page size of 10.
	const numFullPages = Math.ceil(totalRows / 10)
	// Calculate the number of full pages required to display all rows with a maximum of 10 rows per page.
	// Math.ceil(totalRows / 10) rounds up to the nearest integer to ensure all rows are covered.
	const pageSizeOptions = Array.from(
		{ length: totalRows === 0 ? 1 : numFullPages },
		(_, index) => (index + 1) * 10,
	)

	return (
		<div className="flex items-center justify-between px-2">
			<div className="flex-1 text-sm text-muted-foreground">
				{table.getFilteredSelectedRowModel().rows.length} of{' '}
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={value => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{pageSizeOptions.map(pageSize => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<Icon name="arrow-left" className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<Icon name="chevron-left" className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<Icon name="chevron-right" className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
						<Icon name="arrow-right" className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	)
}
