import { type FilmVideo } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '#app/components/ui/checkbox.tsx'
import { QUALITY, SITES, VIDEO_TYPES } from '#app/utils/constants.ts'
import { DataTableColumnHeader } from '../../data-table-column-header.tsx'

export const columns: ColumnDef<
	Pick<FilmVideo, 'id' | 'name' | 'site' | 'type' | 'quality'>
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
			const type = VIDEO_TYPES.find(type => type.value === row.getValue('type'))

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
