import { type PersonImage } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '#app/components/ui/checkbox.tsx'
import { DataTableColumnHeader } from '../../data-table-column-header.tsx'

export const columns: ColumnDef<
	Pick<PersonImage, 'id' | 'image' | 'primary'>
>[] = [
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
			cell: ({ row }) => {
				return (
					<div className="w-[300px] truncate">
						<a href={row.getValue('id')}>{row.getValue('id')}</a>
					</div>
				)
			},
		},
		{
			accessorKey: 'image',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Image" />
			),
			cell: ({ row }) => {
				return (
					<div className="w-[300px] truncate">
						<a href={row.getValue('image')}>{row.getValue('image')}</a>
					</div>
				)
			},
		},
		{
			accessorKey: 'primary',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Primary" />
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getValue('primary')}
					className={
						row.getValue('primary') ? 'translate-y-[4px]' : '-translate-y-[2px]'
					}
				/>
			),
		},
	]
