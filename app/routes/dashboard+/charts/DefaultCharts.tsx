import DefaultChart from '#app/components/chart/default.js'

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

export default function DefaultCharts() {
	return (
		<>
			{mockData.map((data, index) => (
				<DefaultChart key={index} {...data} />
			))}
		</>
	)
}
