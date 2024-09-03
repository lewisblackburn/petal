import { FilmAndSeriesChart } from './charts/BarChart'
import DefaultCharts from './charts/DefaultCharts'
import GenreChart from './charts/GenreChart'

export default function DashboardPage() {
	return (
		<div className="grid gap-5">
			<div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
				<FilmAndSeriesChart />
				<FilmAndSeriesChart />
			</div>
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				<GenreChart />
				<DefaultCharts />
			</div>
		</div>
	)
}
