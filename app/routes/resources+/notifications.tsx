import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import { json, useFetcher } from '@remix-run/react'
import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'
import { z } from 'zod'
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
import { cn } from '#app/utils/misc.js'

const actionSchema = z.object({
	id: z.string().optional(),
	all: z.preprocess((val) => val === 'true', z.boolean().optional()),
})

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)

	const notifications = await prisma.notification.findMany({
		where: {
			user: { id: userId },
			createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Within the last 7 days
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	invariantResponse(notifications, 'Not found', { status: 404 })

	return json({ notifications })
}

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)

	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: actionSchema,
	})

	invariantResponse(submission.status === 'success', 'Invalid form submission')

	const { id, all } = submission.value

	if (all) {
		await prisma.notification.updateMany({
			where: { user: { id: userId }, read: false },
			data: { read: true },
		})
	} else {
		await prisma.notification.update({
			where: { user: { id: userId }, id },
			data: { read: true },
		})
	}

	const notifications = await prisma.notification.findMany({
		where: {
			user: { id: userId },
			createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Within the last 7 days
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	invariantResponse(notifications, 'Not found', { status: 404 })

	return json({ notifications })
}

export default function Notifications() {
	const [open, setOpen] = useState(false)
	const fetcher = useFetcher<typeof loader>()
	const notifications = fetcher.data?.notifications ?? []

	const hasUnreadNotifications = notifications.some(
		(notification) => !notification.read,
	)
	const hasNotifications = notifications.length > 0

	useEffect(() => {
		fetcher.submit(null, { method: 'get', action: '/resources/notifications' })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loadNotifications = async () => {
		if (open) return

		await fetcher.submit(null, {
			method: 'get',
			action: '/resources/notifications',
		})
	}

	const markAllAsRead = async () => {
		if (notifications.every((n) => n.read)) return

		await fetcher.submit(
			{ all: true },
			{ method: 'post', action: '/resources/notifications' },
		)
	}

	const markAsRead = async (id: string) => {
		if (notifications.find((n) => n.id === id)?.read) return

		await fetcher.submit(
			{ id },
			{ method: 'post', action: '/resources/notifications' },
		)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					onClick={loadNotifications}
					variant="outline"
					size="icon"
					className="relative ml-auto h-8 w-8"
				>
					{hasUnreadNotifications ? (
						<Icon name="bell-ring" className="h-4 w-4" />
					) : (
						<Icon name="bell" className="h-4 w-4" />
					)}
					<span className="sr-only">Toggle notifications</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-96">
				<ScrollArea
					className={cn({
						'h-fit': !hasNotifications,
						'h-[130px]': notifications.length === 1,
						'h-[220px]': notifications.length === 2,
						'h-96': notifications.length > 3,
					})}
				>
					<div className="grid gap-4">
						<div className="mx-1 mt-1 flex items-center justify-between">
							<Button variant="secondary">View All</Button>
							<Button onClick={markAllAsRead}>Mark all as read</Button>
						</div>
						{!hasNotifications && (
							<div className="flex flex-col items-center gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
								No recent notifications
							</div>
						)}
						{notifications.map((notification) => (
							<button
								key={notification.id}
								className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
								onClick={() => markAsRead(notification.id)}
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
								<div className="line-clamp-2 w-[200px] truncate text-ellipsis text-xs text-muted-foreground">
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
