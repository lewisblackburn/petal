import { columns } from './edits-table/columns'
import { payments } from './edits-table/data'
import { ChangesTable } from './edits-table/data-table'

export default function DashboardChangesPage() {
	return (
		<div>
			<ChangesTable columns={columns} data={payments} />
		</div>
	)
}
