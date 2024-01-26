import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import {
	type LoaderFunctionArgs,
	type MetaFunction,
	json,
} from '@remix-run/node'
import { Link, useLoaderData, useLocation } from '@remix-run/react'
import { format } from 'date-fns'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { InfiniteScroll } from '#app/components/infinite-scroll.tsx'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card'
import { prisma } from '#app/utils/db.server.ts'
import { getUserImgSrc } from '#app/utils/misc'
import { DEFAULT_TAKE, getTableParams } from '#app/utils/request.helper.ts'

export async function loader({ params, request }: LoaderFunctionArgs) {
	const { orderBy, skip, take } = getTableParams(request, DEFAULT_TAKE, {
		orderBy: 'createdAt',
		order: 'desc',
	})

	// const where = {
	// 	columnId: params.filmdId,
	// } satisfies Prisma.EditLogWhereInput

	const logs = await prisma.editLog.findMany({
		orderBy,
		skip,
		take,
		where: {
			columnId: params.filmId,
		},
		select: {
			id: true,
			user: true,
			oldData: true,
			newData: true,
			columnId: true,
			columnName: true,
			tableName: true,
			createdAt: true,
		},
	})

	const count = await prisma.editLog.count({
		where: {
			columnId: params.filmId,
		},
	})

	return json({ logs, count })
}

export default function FilmEditLogsRoute() {
	const data = useLoaderData<typeof loader>()
	const location = useLocation()
	const combined = [...(location.state?.data ?? []), ...data.logs]

	const groupedLogs: { [key: string]: any[] } = combined.reduce(
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

	return (
		<div className="container py-6">
			<div className="mb-5">
				<h2 className="text-2xl font-bold tracking-tight">
					{data.count} Edits
				</h2>
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
									{log.newData && (
										<div className="flex items-center gap-2  bg-green-500/10 p-5">
											+ {log.newData}
										</div>
									)}
									{log.oldData && (
										<div className="flex items-center gap-2 bg-red-500/10 p-5">
											- {log.oldData}
										</div>
									)}
								</CardContent>
							</div>
						))}
						<CardFooter />
					</Card>
				))}
			</main>
			<InfiniteScroll take={DEFAULT_TAKE} count={data.count} data={combined} />
		</div>
	)
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'Film Edit Logs | Petal' },
		{
			name: 'description',
			content: `Reviews on Petal`,
		},
	]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
