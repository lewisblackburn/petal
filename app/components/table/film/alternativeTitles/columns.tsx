import { type Country, type FilmAlternateTitle } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '#app/components/ui/checkbox.tsx'
import { DataTableColumnHeader } from '../../data-table-column-header.tsx'

export const columns: ColumnDef<Partial<FilmAlternateTitle & Country>>[] = [
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
		accessorKey: 'title',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Title" />
		),
		cell: ({ row }) => <div className="w-[200px]">{row.getValue('title')}</div>,
	},
	{
		accessorKey: 'countryName',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Country" />
		),
		cell: ({ row, table }) => {
			console.log()
			return (
				<div className="flex w-[200px] items-center space-x-2">
					<div>{row.original.flag}</div>
					<div>{row.getValue('countryName')}</div>
				</div>
			)
		},
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
