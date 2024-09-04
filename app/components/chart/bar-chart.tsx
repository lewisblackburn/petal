import React from 'react'
import { BarChart as ReBarChart, XAxis, Bar } from 'recharts'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '../ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'

interface ChartData {
	[key: string]: string | number
}

interface SeriesConfig {
	label: string
	color: string
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export interface BarChartConfig {
	[key: string]: SeriesConfig
}

interface BarChartProps {
	title: string
	description: string
	data: ChartData[]
	config: BarChartConfig
	xAxisKey?: string
	tooltipContent?: React.ReactElement
	tooltipCursor?: boolean
	defaultTooltipIndex?: number
}

export function BarChart({
	title,
	description,
	data,
	config,
	xAxisKey = 'date',
	tooltipContent = <ChartTooltipContent hideLabel />,
	tooltipCursor = false,
	defaultTooltipIndex = 1,
}: BarChartProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={config}>
					<ReBarChart accessibilityLayer data={data}>
						<XAxis
							dataKey={xAxisKey}
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => {
								return new Date(value).toLocaleDateString('en-US', {
									weekday: 'short',
								})
							}}
						/>
						{Object.keys(config).map((key) => (
							<Bar
								key={key}
								dataKey={key}
								stackId="a"
								fill={config[key]!.color}
								radius={
									key === Object.keys(config)[0] ? [0, 0, 4, 4] : [4, 4, 0, 0]
								}
							/>
						))}
						<ChartTooltip
							content={tooltipContent}
							cursor={tooltipCursor}
							defaultIndex={defaultTooltipIndex}
						/>
					</ReBarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
