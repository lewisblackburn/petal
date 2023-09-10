import { type Film, type Person } from '@prisma/client'
import {
	type DataFunctionArgs,
	json,
	type V2_MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '#app/utils/db.server.ts'
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

	let result: Film[] | Person[] = []

	if (type === 'film') {
		result = await prisma.film.findMany({
			where: {
				title: {
					contains: searchTerm,
				},
			},
		})
	} else if (type === 'person') {
		result = await prisma.person.findMany({
			where: {
				name: {
					contains: searchTerm,
				},
			},
		})
	}

	return json({ result, type })
}

export default function Search() {
	const { result, type } = useLoaderData<typeof loader>()

	// FIX: This needs an overhaul

	if (type === 'film') {
		return (
			<div className="container py-6">
				{result.map((item: Film) => (
					<div key={item.id}>{item.title}</div>
				))}
			</div>
		)
	}

	if (type === 'person') {
		return (
			<div className="container py-6">
				{result.map((item: Person) => (
					<div key={item.id}>{item.name}</div>
				))}
			</div>
		)
	}

	return <div>error</div>
}
