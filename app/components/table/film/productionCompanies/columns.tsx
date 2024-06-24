import { type ProductionCompany } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import Image from '#app/components/image.tsx'
import { Checkbox } from '#app/components/ui/checkbox.tsx'
import { DataTableColumnHeader } from '../../data-table-column-header.tsx'

export const columns: ColumnDef<Partial<ProductionCompany>>[] = [
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
		accessorKey: 'company',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Company" />
		),
		cell: ({ row }) => (
			<div className="flex w-[200px] items-center space-x-2">
				<Image
					src={row.original.logo ?? ''}
					alt={row.original.name}
					className="h-8"
				/>
				<div>{row.getValue('company')}</div>
			</div>
		),
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
