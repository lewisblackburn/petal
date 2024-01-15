import { invariantResponse } from '@epic-web/invariant'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { type MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import { format } from 'date-fns'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card'
import { requireUserId } from '#app/utils/auth.server'
import { prisma } from '#app/utils/db.server'
import { getUserImgSrc } from '#app/utils/misc'

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserId(request)
	const logs = await prisma.editLog.findMany({
		where: {
			tableName: 'film',
			columnId: params.filmId,
		},
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			user: {
				select: {
					name: true,
					username: true,
					image: true,
					initials: true,
				},
			},
		},
	})
	const logCount = await prisma.editLog.count({
		where: {
			tableName: 'film',
			columnId: params.filmId,
		},
	})

	invariantResponse(logs, 'Not found', { status: 404 })

	const groupedLogs: { [key: string]: any[] } = logs.reduce(
		(groups, log) => {
			const date = new Date(log.createdAt).toISOString().split('T')[0] // Get the date part of the timestamp
			if (!groups[date]) {
				groups[date] = []
			}
			groups[date].push(log)
			return groups
		},
		{} as { [key: string]: any[] },
	)

	return json({ groupedLogs, logCount })
}

export default function ChangesRoute() {
	const { groupedLogs, logCount } = useLoaderData<typeof loader>()

	return (
		<div className="container py-6">
			<div className="mb-5">
				<h2 className="text-2xl font-bold tracking-tight">{logCount} Edits</h2>
				<p className="text-muted-foreground">Edits made to the film.</p>
			</div>
			<main className="flex flex-col gap-5">
				{Object.keys(groupedLogs).map(date => (
					<Card key={date} className="bg-secondary">
						<CardHeader>
							<CardTitle className="text-md">
								{format(new Date(date), 'dd MMMM yyyy')}
							</CardTitle>
						</CardHeader>
						{groupedLogs[date].map(log => (
							<div key={log.id}>
								<CardContent className="flex flex-col bg-muted p-0">
									<div className="flex items-center gap-2 border border-border p-5">
										<Avatar className="h-8 w-8">
											<Link to={`/users/${log.user?.username}`}>
												<AvatarImage
													className="object-cover"
													src={getUserImgSrc(log.user?.image?.id)}
													alt={log.user?.name ?? log.user?.username}
												/>
											</Link>
											<AvatarFallback>{log.user?.initials}</AvatarFallback>
										</Avatar>
										<span>{log.user?.username}</span>
									</div>
									<div className="flex items-center gap-2 border border-secondary bg-accent px-5 py-3">
										<span className="font-bold">{log.columnName}</span>
									</div>
									{log.oldData && (
										<div className="flex items-center gap-2 bg-red-500/10 p-5">
											- {JSON.stringify(log.oldData, null, 2)}
										</div>
									)}
									{log.newData && (
										<div className="flex items-center gap-2  bg-green-500/10 p-5">
											+ {JSON.stringify(log.newData, null, 2)}
										</div>
									)}
								</CardContent>
							</div>
						))}
						<CardFooter />
					</Card>
				))}
			</main>
		</div>
	)
}

export const meta: MetaFunction = () => [{ title: 'Film Edits | Petal' }]

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				403: () => <p>You are not allowed to do that</p>,
				404: ({ params }) => (
					<p>No film with the id "{params.filmId}" exists</p>
				),
			}}
		/>
	)
}
