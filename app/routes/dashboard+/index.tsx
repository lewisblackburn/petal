import StatisticCard from '#app/components/statistic-card.js'
import { columns } from './edits-table/columns'
import { payments } from './edits-table/data'
import { EditsTable } from './edits-table/data-table'

const mockData = [
	{
		title: 'Total Edits',
		value: 87,
		percentage: 19,
		previousPercentage: 22,
	},
	{
		title: 'Total Films',
		value: 152,
		percentage: 29,
		previousPercentage: 24,
	},
	{
		title: 'Total Series',
		value: 62,
		percentage: 15,
		previousPercentage: 18,
	},
	{
		title: 'Total People',
		value: 178,
		percentage: 32,
		previousPercentage: 30,
	},
	{
		title: 'Total Books',
		value: 142,
		percentage: 20,
		previousPercentage: 26,
	},
	{
		title: 'Total Music',
		value: 99,
		percentage: 22,
		previousPercentage: 20,
	},
	{
		title: 'Total Games',
		value: 163,
		percentage: 28,
		previousPercentage: 25,
	},
]

export default function DashboardPage() {
	return (
		<div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
			<div className="col-span-3">
				<EditsTable columns={columns} data={payments} />
			</div>
			<div className="flex flex-col gap-5">
				{mockData.map((data, index) => (
					<StatisticCard key={index} {...data} />
				))}
			</div>
		</div>
	)
}
