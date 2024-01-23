import { type MetaFunction } from '@remix-run/react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { Avatar, AvatarFallback, AvatarImage } from '#app/components/ui/avatar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card'
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from '#app/components/ui/tabs'

const data = [
	{
		name: 'Jan',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Feb',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Mar',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Apr',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'May',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Jun',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Jul',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Aug',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Sep',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Oct',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Nov',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Dec',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
]

export default function DashboardRoute() {
	return (
		<Tabs defaultValue="overview" className="space-y-4">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics" disabled>
					Analytics
				</TabsTrigger>
				<TabsTrigger value="reports" disabled>
					Reports
				</TabsTrigger>
				<TabsTrigger value="notifications" disabled>
					Notifications
				</TabsTrigger>
			</TabsList>
			<TabsContent value="overview" className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
					<Card className="col-span-4">
						<CardHeader>
							<CardTitle>Overview</CardTitle>
						</CardHeader>
						<CardContent className="pl-2">
							<ResponsiveContainer width="100%" height={350}>
								<BarChart data={data}>
									<XAxis
										dataKey="name"
										stroke="#888888"
										fontSize={12}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis
										stroke="#888888"
										fontSize={12}
										tickLine={false}
										axisLine={false}
										// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
										tickFormatter={value => `$${value}`}
									/>
									<Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
					<Card className="col-span-4">
						<CardHeader>
							<CardTitle>Recent Sales</CardTitle>
							<CardDescription>You made 265 sales this month.</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-8">
								<div className="flex items-center">
									<Avatar className="h-9 w-9">
										<AvatarImage src="/avatars/01.png" alt="Avatar" />
										<AvatarFallback>OM</AvatarFallback>
									</Avatar>
									<div className="ml-4 space-y-1">
										<p className="text-sm font-medium leading-none">
											Olivia Martin
										</p>
										<p className="text-sm text-muted-foreground">
											olivia.martin@email.com
										</p>
									</div>
									<div className="ml-auto font-medium">+$1,999.00</div>
								</div>
								<div className="flex items-center">
									<Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
										<AvatarImage src="/avatars/02.png" alt="Avatar" />
										<AvatarFallback>JL</AvatarFallback>
									</Avatar>
									<div className="ml-4 space-y-1">
										<p className="text-sm font-medium leading-none">
											Jackson Lee
										</p>
										<p className="text-sm text-muted-foreground">
											jackson.lee@email.com
										</p>
									</div>
									<div className="ml-auto font-medium">+$39.00</div>
								</div>
								<div className="flex items-center">
									<Avatar className="h-9 w-9">
										<AvatarImage src="/avatars/03.png" alt="Avatar" />
										<AvatarFallback>IN</AvatarFallback>
									</Avatar>
									<div className="ml-4 space-y-1">
										<p className="text-sm font-medium leading-none">
											Isabella Nguyen
										</p>
										<p className="text-sm text-muted-foreground">
											isabella.nguyen@email.com
										</p>
									</div>
									<div className="ml-auto font-medium">+$299.00</div>
								</div>
								<div className="flex items-center">
									<Avatar className="h-9 w-9">
										<AvatarImage src="/avatars/04.png" alt="Avatar" />
										<AvatarFallback>WK</AvatarFallback>
									</Avatar>
									<div className="ml-4 space-y-1">
										<p className="text-sm font-medium leading-none">
											William Kim
										</p>
										<p className="text-sm text-muted-foreground">
											will@email.com
										</p>
									</div>
									<div className="ml-auto font-medium">+$99.00</div>
								</div>
								<div className="flex items-center">
									<Avatar className="h-9 w-9">
										<AvatarImage src="/avatars/05.png" alt="Avatar" />
										<AvatarFallback>SD</AvatarFallback>
									</Avatar>
									<div className="ml-4 space-y-1">
										<p className="text-sm font-medium leading-none">
											Sofia Davis
										</p>
										<p className="text-sm text-muted-foreground">
											sofia.davis@email.com
										</p>
									</div>
									<div className="ml-auto font-medium">+$39.00</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</TabsContent>
		</Tabs>
	)
}

export const meta: MetaFunction = () => [{ title: 'Dashboard | Petal' }]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
