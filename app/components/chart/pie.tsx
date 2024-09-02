import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '../ui/chart'
import { Label, Pie, PieChart as RePieChart } from 'recharts'
import { Icon } from '../ui/icon'

interface ChartData {
	[key: string]: string | number
	fill: string
}

interface PieChartProps {
	chartData: ChartData[]
	chartConfig: ChartConfig
	dataKey: string
	nameKey: string
	labelKey?: string
}

export default function PieChart({
	chartData,
	chartConfig,
	dataKey,
	nameKey,
	labelKey = 'Default Label',
}: PieChartProps) {
	const totalValue = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + (curr[dataKey] as number), 0)
	}, [chartData, dataKey])

	return (
		<Card className="flex flex-col">
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<RePieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey={dataKey}
							nameKey={nameKey}
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{totalValue.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													{labelKey}
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</RePieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
