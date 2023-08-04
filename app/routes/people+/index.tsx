import { type Prisma, type Person } from '@prisma/client'
import {
	json,
	type HeadersFunction,
	type DataFunctionArgs,
} from '@remix-run/node'
import { Link, useLoaderData, useLocation } from '@remix-run/react'
import { prisma } from '~/utils/db.server.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'
import { InfiniteScroll } from '~/components/infinite-scroll.tsx'
import { SortBy } from '~/components/sort-by.tsx'
import { Container } from '~/components/container.tsx'
import { getTableParams } from '~/utils/request.helper.ts'

const TAKE = 30

export async function loader({ request }: DataFunctionArgs) {
	const timings = makeTimings('people loader')

	const { orderBy, search, skip, take } = getTableParams(request, TAKE, {
		orderBy: 'createdAt',
		order: 'desc',
	})
	const where = {
		OR: search ? [{ name: { contains: search } }] : undefined,
	} satisfies Prisma.PersonWhereInput

	const people = await time(
		() =>
			prisma.person.findMany({
				orderBy,
				skip,
				take,
				where,
			}),
		{ timings, type: 'find people' },
	)
	const count = await time(
		() =>
			prisma.person.count({
				where,
			}),
		{ timings, type: 'find person count' },
	)

	return json(
		{ people, count },
		{ headers: { 'Server-Timing': timings.toString() } },
	)
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export default function PeopleRoute() {
	const data = useLoaderData<typeof loader>()
	const location = useLocation()
	const combined = [...(location.state?.data ?? []), ...data.people]

	return (
		<Container className="grid grid-cols-[300px_1fr] gap-5">
			<div>
				<SortBy />
			</div>
			<main>
				<ul className="grid grid-cols-4 gap-5">
					{combined.map((person: Person) => (
						<li key={person.id}>
							<Link to={person.id}>
								<img
									src={person.image ?? ''}
									alt={person.name}
									className="aspect-a4 rounded-lg bg-muted"
								/>
							</Link>
						</li>
					))}
				</ul>
				<InfiniteScroll take={TAKE} count={data.count} data={combined} />
			</main>
		</Container>
	)
}
