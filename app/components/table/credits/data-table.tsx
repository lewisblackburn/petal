import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
	getSortedRowModel,
} from '@tanstack/react-table'
import React from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table.tsx'
import { DataTablePagination } from '~/components/table/data-table-pagination.tsx'
import { DataTableToolbar } from './data-table-toolbar.js'
import { type Person } from '@prisma/client'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function CreditTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({})
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	)
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = React.useState('')
	const [dataCopy, setDataCopy] = React.useState(data)

	const table = useReactTable({
		data: dataCopy,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			globalFilter,
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	})

	function moveRowsUp() {
		const numRowsToMove = 1 // NOTE: Change this value to the number of rows to move at a time
		const selectedRows = table.getSelectedRowModel().rows
		setDataCopy(data => {
			const newData = [...data]

			for (const selectedRow of selectedRows) {
				const selectedRowIndex = selectedRow.index
				const currentRowData = newData[selectedRowIndex]
				const aboveRowIndex = selectedRowIndex - numRowsToMove
				const aboveRowData = newData[aboveRowIndex]

				// If there is no row above, skip this row
				if (!aboveRowData) continue

				newData[selectedRowIndex] = aboveRowData
				newData[aboveRowIndex] = currentRowData
			}

			const newSelection = {}
			selectedRows.forEach(selectedRow => {
				const selectedRowIndex = selectedRow.index
				newSelection[selectedRowIndex] = false
				newSelection[selectedRowIndex - numRowsToMove] = true
			})

			table.setRowSelection(newSelection)
			return newData
		})
	}

	function moveRowsDown() {
		const numRowsToMove = 1 // NOTE: Change this value to the number of rows to move at a time
		const selectedRows = table.getSelectedRowModel().rows
		setDataCopy(data => {
			const newData = [...data]

			// Reverse the order of selected rows to start moving from the bottom-most row
			const reversedSelectedRows = selectedRows.slice().reverse()

			for (const selectedRow of reversedSelectedRows) {
				const selectedRowIndex = selectedRow.index
				const currentRowData = newData[selectedRowIndex]
				const belowRowIndex = selectedRowIndex + numRowsToMove
				const belowRowData = newData[belowRowIndex]

				// If there is no row below, skip this row
				if (!belowRowData) continue

				newData[selectedRowIndex] = belowRowData
				newData[belowRowIndex] = currentRowData
			}

			const newSelection = {}
			selectedRows.forEach(selectedRow => {
				const selectedRowIndex = selectedRow.index
				newSelection[selectedRowIndex] = false
				newSelection[selectedRowIndex + numRowsToMove] = true
			})

			table.setRowSelection(newSelection)
			return newData
		})
	}

	return (
		<div className="space-y-4">
			<button onClick={moveRowsUp}>Move up</button>
			<button onClick={moveRowsDown}>Move Down</button>
			<DataTableToolbar table={table} />
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	)
}
