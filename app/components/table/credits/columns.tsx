import { type CreditMember } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '~/components/ui/checkbox.tsx'
import { DataTableColumnHeader } from '../data-table-column-header.js'
import { CreditRoles, getAllJobs } from '~/utils/credit-roles.ts'

export const columns: ColumnDef<Partial<CreditMember>>[] = [
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
		cell: ({ row }) => <div className="w-[160px]">{row.getValue('name')}</div>,
	},
	{
		accessorKey: 'character',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Character" />
		),
		cell: ({ row }) => (
			<div className="w-[160px]">{row.getValue('character')}</div>
		),
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
		accessorKey: 'department',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Department" />
		),
		cell: ({ row }) => {
			const department = CreditRoles.find(
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
]
