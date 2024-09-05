import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '#app/components/table/data-table-column-header.js'
import { Checkbox } from '#app/components/ui/checkbox.tsx'
import { type TMDBFilm } from '#app/types/tmdb.js'

export const columns: ColumnDef<Partial<TMDBFilm>>[] = [
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
		accessorKey: 'title',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Title" />
		),
		cell: ({ row }) => (
			<a
				href={`https://www.themoviedb.org/movie/${row.original.id}`}
				target="_blank"
				rel="noreferrer"
			>
				{row.getValue('title')}
			</a>
		),
	},
]
