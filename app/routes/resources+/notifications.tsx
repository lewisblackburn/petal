import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { json, useFetcher } from '@remix-run/react'
import { formatDistanceToNow } from 'date-fns'
import { useEffect, useRef } from 'react'
import { useSpinDelay } from 'spin-delay'
import { Spinner } from '#app/components/spinner.js'
import { Button } from '#app/components/ui/button.js'
import { Icon } from '#app/components/ui/icon.js'
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '#app/components/ui/popover.js'
import { ScrollArea } from '#app/components/ui/scroll-area.js'
import { requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)

	const notifications = await prisma.notification.findMany({
		where: {
			user: { id: userId },
			read: false,
			createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Within the last 7 days
		},
	})

	invariantResponse(notifications, 'Not found', { status: 404 })

	return json({ notifications })
}

export default function Notifications() {
	const fetcher = useFetcher<typeof loader>()
	const notifications = fetcher.data?.notifications ?? []

	function test() {
		fetcher.submit({
			method: 'GET',
			action: '/resources/notifications',
		})
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
					<Icon name="bell" className="h-4 w-4" onClick={() => test()} />
					<span className="sr-only">Toggle notifications</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-96">
				<ScrollArea className="h-fit max-h-96">
					<div className="grid gap-4">
						<div className="mx-1 mt-1 flex items-center justify-between">
							<Button variant="secondary">View All</Button>
							<Button
								onClick={() => {
									notifications.forEach(
										(notification) => (notification.read = true),
									)
								}}
							>
								Mark all as read
							</Button>
						</div>
						{notifications.length === 0 && (
							<div className="flex flex-col items-center gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
								No recent notifications
							</div>
						)}
						{notifications.map((notification) => (
							<button
								key={notification.id}
								className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
								onClick={() => (notification.read = true)}
							>
								<div className="flex w-full flex-col gap-1">
									<div className="flex items-center">
										<div className="flex items-center gap-2">
											<div className="font-semibold">{notification.title}</div>
											{!notification.read && (
												<span className="flex h-2 w-2 rounded-full bg-blue-600" />
											)}
										</div>
										<div className="ml-auto text-xs text-muted-foreground">
											{formatDistanceToNow(new Date(notification.createdAt), {
												addSuffix: true,
											})}
										</div>
									</div>
								</div>
								<div className="line-clamp-2 text-xs text-muted-foreground">
									{notification.content.substring(0, 300)}
								</div>
							</button>
						))}
					</div>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	)
}
