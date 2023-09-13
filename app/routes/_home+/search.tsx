import {
	type DataFunctionArgs,
	json,
	type V2_MetaFunction,
} from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { cn } from '#app/utils/misc.tsx'
import { getTableParams } from '#app/utils/request.helper.ts'

export const meta: V2_MetaFunction = () => {
	return [{ title: 'Search | Petal' }]
}

export async function loader({ request }: DataFunctionArgs) {
	const { search: searchTerm } = getTableParams(request, 5)

	const results: any = await prisma.$queryRaw`
    SELECT 
      CASE 
        WHEN film_relevance > person_relevance THEN 'film'
        ELSE 'person'
      END AS type
    FROM (
      SELECT 
        (
          (CASE WHEN title LIKE '%' || ${searchTerm} || '%' THEN 1 ELSE 0 END)
        ) AS film_relevance,
        (
          (CASE WHEN name LIKE '%' || ${searchTerm} || '%' THEN 1 ELSE 0 END)
        ) AS person_relevance
      FROM (
        SELECT id, title, NULL AS name FROM "Film"
        UNION ALL
        SELECT id, NULL AS title, name FROM "Person"
      ) AS combined_data
      WHERE 
        (title LIKE '%' || ${searchTerm} || '%' OR 
        name LIKE '%' || ${searchTerm} || '%')
    ) AS relevance_data
    ORDER BY 
      CASE 
        WHEN film_relevance > person_relevance THEN film_relevance
        ELSE person_relevance
      END DESC
    LIMIT 1; -- Limit to the most relevant result
  `

	const type = results[0]?.type ?? 'film'

	const counts = await prisma.$transaction(async $prisma => {
		const filmCount = await $prisma.film.count({
			where: { title: { contains: searchTerm } },
		})
		const peopleCount = await $prisma.person.count({
			where: { name: { contains: searchTerm } },
		})

		return { filmCount, peopleCount }
	})

	const { filmCount, peopleCount } = counts

	return json({ filmCount, peopleCount, type })
}

export default function Search() {
	const { filmCount, peopleCount } = useLoaderData<typeof loader>()

	const LINKS = [
		{
			href: '',
			label: 'Films',
			count: filmCount,
		},
		{
			href: 'television',
			label: 'Television',
			count: 0,
		},
		{
			href: 'people',
			label: 'People',
			count: peopleCount,
		},
		{
			href: 'books',
			label: 'Books',
			count: 0,
		},
		{
			href: 'music',
			label: 'Music',
			count: 0,
		},
	]

	return (
		<div className="container py-6">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Search Results</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col">
					{LINKS.map(({ href, label, count }) => (
						<NavLink
							key={href}
							to={href}
							className={({ isActive }) =>
								cn(
									'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
									isActive && 'text-primary',
								)
							}
							end
						>
							{label} ({count})
						</NavLink>
					))}
				</CardContent>
			</Card>
			<Outlet />
		</div>
	)
}
