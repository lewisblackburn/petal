import { type CreditMember } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '~/components/ui/checkbox.tsx'
import { DataTableColumnHeader } from '../data-table-column-header.js'
import { CreditRoles, getAllJobs } from '~/utils/credit-roles.ts'
import { Button } from '~/components/ui/button.tsx'
import { Icon } from '~/components/ui/icon.tsx'

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

	{
		id: 'delete',
		cell: ({ table, row }) => {
			return (
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 text-foreground-danger"
					onClick={() => {
						// TODO: Delete creidt member(s) from film
						console.log(table.getSelectedRowModel(), row.original.id)
					}}
				>
					<Icon name="trash" className="h-5 w-5" />
					<span className="sr-only">Delete</span>
				</Button>
			)
		},
	},
]
