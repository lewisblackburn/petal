import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '~/components/ui/checkbox.tsx'
import { DataTableRowActions } from './data-table-row-actions.tsx'
import { DataTableColumnHeader } from '~/components/table/data-table-column-header.tsx'
import { type CreditMember } from '@prisma/client'
import { departments, jobs } from '~/utils/constants.ts'

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
		accessorKey: 'id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Person" />
		),
		cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'character',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Character" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue('character')}</div>
		),
	},
	{
		accessorKey: 'job',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Job" />
		),
		cell: ({ row }) => {
			const job = jobs.find(job => job.value === row.getValue('job'))

			if (!job) {
				return null
			}

			return (
				<div className="flex w-[100px] items-center">
					{/* {job.icon && ( */}
					{/*   <job.icon className="mr-2 h-4 w-4 text-muted-foreground" /> */}
					{/* )} */}
					<span>{job.label}</span>
				</div>
			)
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
			const department = departments.find(
				department => department.value === row.getValue('department'),
			)

			if (!department) {
				return null
			}

			return (
				<div className="flex items-center">
					{/* {department.icon && ( */}
					{/*   <department.icon className="mr-2 h-4 w-4 text-muted-foreground" /> */}
					{/* )} */}
					<span>{department.label}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
