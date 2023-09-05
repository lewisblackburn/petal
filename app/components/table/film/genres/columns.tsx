import { type Genre } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '#app/components/ui/checkbox.tsx'
import { DataTableColumnHeader } from '../../data-table-column-header.tsx'

export const columns: ColumnDef<Partial<Genre>>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className={
					table.getIsAllPageRowsSelected()
						? 'translate-y-[4px]'
						: '-translate-y-[2px]'
				}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label="Select row"
				className={
					row.getIsSelected() ? 'translate-y-[4px]' : '-translate-y-[2px]'
				}
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="ID" />
		),
		cell: ({ row }) => <div>{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => <div className="w-[400px]">{row.getValue('name')}</div>,
	},
	{
		accessorKey: 'created',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="createdAt" />
		),
		cell: ({ row }) => (
			<div className="w-[250px]">{row.getValue('created')}</div>
		),
	},
	{
		accessorKey: 'updated',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="updatedAt" />
		),
		cell: ({ row }) => (
			<div className="w-[250px]">{row.getValue('updated')}</div>
		),
	},
]
