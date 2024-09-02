import {
	Card,
	CardHeader,
	CardDescription,
	CardTitle,
	CardContent,
	CardFooter,
} from './ui/card'
import { Progress } from './ui/progress'

interface StatisticCardProps {
	title: string
	value: number
	percentage: number
	previousPercentage: number
}

export default function StatisticCard({
	title,
	value,
	percentage,
	previousPercentage,
}: StatisticCardProps) {
	const percentageChange = percentage - previousPercentage
	const percentageChangeString =
		percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`

	console.log(
		title,
		value,
		percentage,
		previousPercentage,
		percentageChangeString,
	)

	return (
		<Card className="w-full">
			<CardHeader className="pb-2">
				<CardDescription>{title}</CardDescription>
				<CardTitle className="text-4xl">{value}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-xs text-muted-foreground">
					{percentageChangeString} from last week
				</div>
			</CardContent>
			<CardFooter>
				<Progress
					value={percentage}
					aria-label={String(percentageChangeString)}
				/>
			</CardFooter>
		</Card>
	)
}
