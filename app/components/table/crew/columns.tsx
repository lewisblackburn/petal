import { type CrewMember } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '~/components/ui/checkbox.tsx'
import { CREW_ROLES, getAllJobs } from '~/utils/constants.ts'
import { DataTableColumnHeader } from '../data-table-column-header.js'

export const columns: ColumnDef<Partial<CrewMember>>[] = [
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
			const department = CREW_ROLES.find(
				department => department.value === row.getValue('department'),
			)

			if (!department) {
				return null
			}

			return <span>{department.label}</span>
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
			const job = getAllJobs().find(job => job.value === row.getValue('job'))

			if (!job) {
				return null
			}

			return <span>{job.label}</span>
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
