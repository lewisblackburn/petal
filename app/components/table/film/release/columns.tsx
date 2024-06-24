import { type FilmReleaseInformation } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '#app/components/ui/checkbox.tsx'
import { COUNTRIES } from '#app/utils/constants.ts'
import { DataTableColumnHeader } from '../../data-table-column-header.tsx'

export const columns: ColumnDef<Partial<FilmReleaseInformation>>[] = [
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
		accessorKey: 'country',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Country" />
		),
		cell: ({ row }) => (
			<div>
				{
					COUNTRIES.find((country) => country.name === row.original.country)
						?.flag
				}{' '}
				{row.getValue('country')}
			</div>
		),
		filterFn: (row, id, value) => {
			return value.includes(row.original.country)
		},
	},
	{
		accessorKey: 'language',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Language" />
		),
		cell: ({ row }) => <div className="">{row.getValue('language')}</div>,
	},
	{
		accessorKey: 'releaseDate',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => <div className="">{row.getValue('releaseDate')}</div>,
	},
	{
		accessorKey: 'classification',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Classification" />
		),
		cell: ({ row }) => <div className="">{row.getValue('classification')}</div>,
	},
	{
		accessorKey: 'type',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
		cell: ({ row }) => <div className="">{row.getValue('type')}</div>,
	},
	{
		accessorKey: 'note',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Note" />
		),
		cell: ({ row }) => <div className="">{row.getValue('note')}</div>,
	},
]
