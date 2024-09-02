import { ChartConfig } from '#app/components/ui/chart.js'
import { FilmAndSeriesChart } from './charts/BarChart'
import DefaultCharts from './charts/DefaultCharts'
import GenreChart from './charts/GenreChart'
import { columns } from './edits-table/columns'
import { payments } from './edits-table/data'
import { EditsTable } from './edits-table/data-table'

export default function DashboardPage() {
	return (
		<div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
			<div>{/* <EditsTable columns={columns} data={payments} /> */}</div>
			<div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
				{/* <GenreChart />
				<FilmAndSeriesChart />
				<DefaultCharts /> */}
			</div>
		</div>
	)
}
