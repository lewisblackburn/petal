import { type FilmCrewMember } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '#app/components/ui/checkbox.tsx'
import { DataTableColumnHeader } from '../../data-table-column-header.tsx'

export const columns: ColumnDef<Partial<FilmCrewMember>>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
				onCheckedChange={(value) => row.toggleSelected(!!value)}
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
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => <div className="w-[160px]">{row.getValue('name')}</div>,
	},
	{
		accessorKey: 'department',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Department" />
		),
		cell: ({ row }) => {
			return <span>{row.getValue('department')}</span>
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'job',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Job" />
		),
		cell: ({ row }) => {
			return <span>{row.getValue('job')}</span>
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'featured',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Featured" />
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getValue('featured')}
				className={
					row.getValue('featured') ? 'translate-y-[4px]' : '-translate-y-[2px]'
				}
			/>
		),
	},
]
