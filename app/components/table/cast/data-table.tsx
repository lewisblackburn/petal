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
	arrayMove,
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
import { useParams, useSubmit } from '@remix-run/react'
import { toast } from '~/components/ui/use-toast.ts'

const SortableRow = ({ row, data }: { row: any; data: any }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		setActivatorNodeRef,
	} = useSortable({
		id: String(data.id),
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
			<TableCell key="order" ref={setActivatorNodeRef}>
				<Icon name="drag-handle-dots-2" cursor="grab" {...listeners} />
			</TableCell>
		</TableRow>
	)
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function CastTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const { filmId } = useParams()
	const [dataCopy, setDataCopy] = useState(data)
	const [rowSelection, setRowSelection] = React.useState({})
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	)
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = React.useState('')

	// NOTE: Update the dataAsArrayOfIds when the data changes to ensure the order can be updated
	React.useEffect(() => {
		setDataCopy(data)
	}, [data])

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

	const submit = useSubmit()

	const onDragEnd = (event: any) => {
		const { active, over } = event
		if (active.id === over.id || !filmId) return

		// if sorted rows not in same order as dataCopy then return
		const sortedRows = table
			.getSortedRowModel()
			.rows.map((row: any) => row.original.id)
		const dataCopyIds = dataCopy.map((item: any) => item.id)
		if (sortedRows.join() !== dataCopyIds.join()) {
			return toast({
				title: "Can't reorder when table is sorted",
				description: 'Please remove sorting and try again',
				variant: 'destructive',
			})
		}

		const oldIndex = data.findIndex((item: any) => item.id === active.id)
		const newIndex = data.findIndex((item: any) => item.id === over.id)
		const newData = arrayMove(dataCopy, oldIndex, newIndex)
		// update the dataCopy to the new order
		setDataCopy(newData)
		const castMemberBeforeIndex =
			newData.findIndex((item: any) => item.id === active.id) - 1
		const castMemberAfterIndex =
			newData.findIndex((item: any) => item.id === active.id) + 1

		const castMemberBefore = newData[castMemberBeforeIndex]
		const castMemberAfter = newData[castMemberAfterIndex]

		console.log(castMemberBefore, active.id, castMemberAfter, dataCopy)

		const formData = new FormData()
		formData.set('filmId', filmId.toString())
		formData.set('castMemberBefore', JSON.stringify(castMemberBefore ?? {}))
		formData.set('castMemberId', active.id)
		formData.set('castMemberAfter', JSON.stringify(castMemberAfter ?? {}))

		submit(formData, {
			method: 'POST',
			action: '/resources/film/reorder-cast-members',
			preventScrollReset: true,
		})
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
									{/* NOTE: This fixes the length of the table header */}
									<TableHead key="order" />
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							<SortableContext
								items={dataCopy.map((item: any) => item.id)}
								strategy={verticalListSortingStrategy}
							>
								{table.getRowModel().rows?.length ? (
									table
										.getRowModel()
										.rows.map((row, index) => (
											<SortableRow
												key={row.id}
												row={row}
												data={dataCopy[index]}
											/>
										))
								) : (
									<TableRow>
										<TableCell
											// NOTE: This fixes the length of the table body by adding a column for the order
											colSpan={columns.length + 1}
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
