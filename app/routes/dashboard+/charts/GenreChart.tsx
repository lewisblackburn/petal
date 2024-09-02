import PieChart from '#app/components/chart/pie.js'
import { ChartConfig } from '#app/components/ui/chart.js'

const chartData = [
	{ genre: 'Romance', count: 20, fill: 'hsl(var(--chart-1))' },
	{ genre: 'Action', count: 30, fill: 'hsl(var(--chart-2))' },
	{ genre: 'Comedy', count: 40, fill: 'hsl(var(--chart-3))' },
	{ genre: 'Drama', count: 10, fill: 'hsl(var(--chart-4))' },
	{ genre: 'Thriller', count: 15, fill: 'hsl(var(--chart-5))' },
]

const chartConfig = {
	genres: {
		label: 'Genres',
	},
	romance: {
		label: 'Romance',
		color: 'hsl(var(--chart-1))',
	},
	action: {
		label: 'Action',
		color: 'hsl(var(--chart-2))',
	},
	comedy: {
		label: 'Comedy',
		color: 'hsl(var(--chart-3))',
	},
	drama: {
		label: 'Drama',
		color: 'hsl(var(--chart-4))',
	},
	thriller: {
		label: 'Thriller',
		color: 'hsl(var(--chart-5))',
	},
} satisfies ChartConfig

export default function GenreChart() {
	return (
		<PieChart
			chartData={chartData}
			chartConfig={chartConfig}
			dataKey="count"
			nameKey="genre"
			labelKey="Genres"
		/>
	)
}
