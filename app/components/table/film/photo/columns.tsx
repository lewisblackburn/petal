import { type FilmPhoto } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '#app/components/ui/checkbox.tsx'
import { PHOTO_TYPES } from '#app/utils/constants.ts'
import { DataTableColumnHeader } from '../../data-table-column-header.tsx'
import { DataTableRowActions } from './data-table-row-actions.tsx'

export const columns: ColumnDef<
	Pick<FilmPhoto, 'filename' | 'url' | 'type' | 'language'>
>[] = [
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
		accessorKey: 'filename',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Filename" />
		),
		cell: ({ row }) => {
			return (
				<div className="w-[300px] truncate">
					<a href={row.original.url}>{row.getValue('filename')}</a>
				</div>
			)
		},
	},
	{
		accessorKey: 'type',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
		cell: ({ row }) => {
			const type = PHOTO_TYPES.find(
				(type) => type.value === row.getValue('type'),
			)

			if (!type) {
				return null
			}

			return <div className="w-[150px]">{type.label}</div>
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'language',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Language" />
		),
		cell: ({ row }) => {
			return <div className="w-[150px]">{row.getValue('language')}</div>
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'primary',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Primary" />
		),
		cell: ({ row }) => {
			return (
				<Checkbox
					checked={row.getValue('primary')}
					aria-label="Primary"
					className={
						row.getValue('primary') ? 'translate-y-[4px]' : '-translate-y-[4px]'
					}
				/>
			)
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
