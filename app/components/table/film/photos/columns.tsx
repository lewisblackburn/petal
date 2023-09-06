import { type FilmPhoto } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '#app/components/ui/checkbox.tsx'
import { LANGUAGES, PHOTO_TYPES } from '#app/utils/constants.ts'
import { DataTableColumnHeader } from '../../data-table-column-header.tsx'

export const columns: ColumnDef<
	Pick<FilmPhoto, 'id' | 'image' | 'type' | 'language'>
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
			accessorKey: 'type',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Type" />
			),
			cell: ({ row }) => {
				const type = PHOTO_TYPES.find(type => type.value === row.getValue('type'))

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
				const language = LANGUAGES.find(
					language => language.value === row.getValue('language'),
				)

				if (!language) {
					return null
				}

				return <div className="w-[150px]">{language.label}</div>
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id))
			},
		},
	]
