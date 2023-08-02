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
import React, { useState } from 'react'
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
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
	restrictToParentElement,
	restrictToVerticalAxis,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import { Icon } from '~/components/ui/icon.tsx'

const SortableRow = ({ row, data }: { row: any; data: any }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		setActivatorNodeRef,
	} = useSortable({
		id: String(data),
		strategy: verticalListSortingStrategy,
	})
	const style = {
		transition,
		transform: transform ? CSS.Translate.toString(transform) : undefined,
		cursor: 'inherit',
	}

	return (
		<TableRow
			key={row.id}
			ref={setNodeRef}
			style={style}
			{...attributes}
			data-state={row.getIsSelected() && 'selected'}
		>
			{row.getVisibleCells().map((cell: any) => (
				<TableCell key={cell.id}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
			<TableCell ref={setActivatorNodeRef}>
				<Icon name="drag-handle-dots-2" cursor="grab" {...listeners} />
			</TableCell>
		</TableRow>
	)
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function CreditTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [dataAsArrayOfIds] = useState(data.map((item: any) => item.id))
	const [rowSelection, setRowSelection] = React.useState({})
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	)
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = React.useState('')

	const table = useReactTable({
		data,
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

	const onDragEnd = (event: any) => {
		const { active, over } = event
		if (active.id === over.id) return

		const newIndex = data.findIndex((item: any) => item.id === over.id)

		// set active.id to new index with prisma
		console.log(active.id, newIndex)
	}

	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragEnd={onDragEnd}
			modifiers={[
				restrictToVerticalAxis,
				restrictToWindowEdges,
				restrictToParentElement,
			]}
		>
			<div className="space-y-4">
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
							<SortableContext
								items={dataAsArrayOfIds}
								strategy={verticalListSortingStrategy}
							>
								{table.getRowModel().rows?.length ? (
									table
										.getRowModel()
										.rows.map((row, index) => (
											<SortableRow
												key={row.id}
												row={row}
												data={dataAsArrayOfIds[index]}
											/>
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
							</SortableContext>
						</TableBody>
					</Table>
				</div>

				<DataTablePagination table={table} />
			</div>
		</DndContext>
	)
}
