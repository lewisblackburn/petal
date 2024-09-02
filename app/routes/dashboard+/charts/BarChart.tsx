import { BarChart, BarChartConfig } from '#app/components/chart/bar-chart.js'
import { Icon } from '#app/components/ui/icon.js'

const chartData = [
	{
		date: '2024-07-15',
		films: 36,
		series: 72,
	},
	{
		date: '2024-07-16',
		films: 70,
		series: 33,
	},
	{
		date: '2024-07-17',
		films: 66,
		series: 3,
	},
	{
		date: '2024-07-18',
		films: 36,
		series: 24,
	},
	{
		date: '2024-07-19',
		films: 79,
		series: 60,
	},
	{
		date: '2024-07-20',
		films: 9,
		series: 52,
	},
	{
		date: '2024-07-21',
		films: 39,
		series: 63,
	},
]

const chartConfig: BarChartConfig = {
	films: {
		label: 'Films',
		color: 'hsl(var(--chart-1))',
		icon: (props) => <Icon {...props} name="video" />,
	},
	series: {
		label: 'Series',
		color: 'hsl(var(--chart-2))',
		icon: (props) => <Icon {...props} name="tv" />,
	},
}

export function TestBarChart() {
	return (
		<BarChart
			title="Recently Added"
			description="Film and Series added over the week"
			data={chartData}
			config={chartConfig}
			xAxisKey="date"
		/>
	)
}
