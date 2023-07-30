import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '~/components/ui/checkbox.tsx'
import { type Keyword } from '@prisma/client'
import { DataTableColumnHeader } from '../data-table-column-header.tsx'
import { MEDIA_TYPES, QUALITY, SITES } from '~/utils/constants.ts'

export const columns: ColumnDef<Partial<Keyword>>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
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
		cell: ({ row }) => <div className="w-[100px]">{row.getValue('name')}</div>,
	},
	{
		accessorKey: 'site',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Site" />
		),
		cell: ({ row }) => {
			const site = SITES.find(site => site.value === row.getValue('site'))

			if (!site) {
				return null
			}

			return <span>{site.label}</span>
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'type',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
		cell: ({ row }) => {
			const type = MEDIA_TYPES.find(type => type.value === row.getValue('type'))

			if (!type) {
				return null
			}

			return <span>{type.label}</span>
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'quality',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Quality" />
		),
		cell: ({ row }) => {
			const quality = QUALITY.find(
				quality => quality.value === row.getValue('quality'),
			)

			if (!quality) {
				return null
			}

			return <span>{quality.label}</span>
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
]
