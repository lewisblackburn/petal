import { type Prisma } from '@prisma/client'
import {
	type LoaderFunctionArgs,
	type MetaFunction,
	json,
} from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { PaginationBar } from '#app/components/pagination-bar'
import { Avatar, AvatarFallback, AvatarImage } from '#app/components/ui/avatar'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card'
import { prisma } from '#app/utils/db.server.ts'
import { getUserImgSrc } from '#app/utils/misc'
import { getTableParams } from '#app/utils/request.helper.ts'

const TAKE = 5

export async function loader({ params, request }: LoaderFunctionArgs) {
	const { orderBy, skip, take } = getTableParams(request, TAKE, {
		orderBy: 'createdAt',
		order: 'desc',
	})

	const where = {
		filmId: params.filmId,
	} satisfies Prisma.FilmEditWhereInput

	const edits = await prisma.filmEdit.findMany({
		orderBy,
		skip,
		take,
		where,
		select: {
			id: true,
			model: true,
			operation: true,
			oldValues: true,
			newValues: true,
			createdAt: true,
			user: {
				select: {
					email: true,
					image: true,
					username: true,
					name: true,
					initials: true,
				},
			},
		},
	})

	const count = await prisma.filmEdit.count({ where })

	// const usersWithLogs = await prisma.user.findMany({
	// 	where: {
	// 		logs: {
	// 			some: {
	// 				auditModelId: params.filmId,
	// 			},
	// 		},
	// 	},
	// 	select: {
	// 		id: true,
	// 		username: true,
	// 		_count: {
	// 			select: {
	// 				logs: {
	// 					where,
	// 				},
	// 			},
	// 		},
	// 	},
	// })

	return json({ edits, count })
}

export default function FilmEditLogsRoute() {
	const data = useLoaderData<typeof loader>()

	const groupedEdits: { [key: string]: any[] } = data.edits.reduce(
		(groups, edit) => {
			const date = new Date(edit.createdAt).toISOString().split('T')[0] // Get the date part of the timestamp
			if (!groups[date]) {
				groups[date] = []
			}
			groups[date].push(edit)
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
				{Object.keys(groupedEdits).map(date => (
					<Card key={date} className="bg-secondary">
						<CardHeader>
							<CardTitle className="text-md">
								{format(new Date(date), 'dd MMMM yyyy')}
							</CardTitle>
						</CardHeader>
						{groupedEdits[date].map((edit: (typeof data.edits)[0]) => {
							return (
								<div key={edit.id}>
									<CardContent className="flex flex-col p-0">
										<div className="flex items-center gap-2 p-5">
											<Avatar className="h-8 w-8">
												<Link to={`/users/${edit.user?.username}`}>
													<AvatarImage
														className="object-cover"
														src={getUserImgSrc(edit.user?.image?.id)}
														alt={edit.user?.name ?? edit.user?.username}
													/>
												</Link>

												<AvatarFallback>{edit.user?.initials}</AvatarFallback>
											</Avatar>
											<span>{edit.user?.name}</span>
										</div>
										<div className="flex items-center gap-2 bg-popover/10 px-5 py-3">
											<span className="font-bold">{edit.model}</span>
										</div>
										{edit.newValues !== '{}' && (
											<div className="flex items-center gap-2  bg-green-500/10 p-5">
												<pre className="whitespace-pre-wrap">
													{JSON.stringify(
														JSON.parse(edit.newValues || ''),
														null,
														2,
													)}
												</pre>
											</div>
										)}
										{edit.oldValues !== '{}' && (
											<div className="flex items-center gap-2 bg-red-500/10 p-5">
												<pre className="whitespace-pre-wrap">
													{JSON.stringify(
														JSON.parse(edit.oldValues || ''),
														null,
														2,
													)}
												</pre>
											</div>
										)}
									</CardContent>
								</div>
							)
						})}
						<CardFooter />
					</Card>
				))}
			</main>
			<PaginationBar take={TAKE} count={data.count} />
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
