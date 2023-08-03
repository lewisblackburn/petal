import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '~/utils/db.server.ts'
import { Container } from '~/components/container.tsx'
import { CreditTable } from '~/components/table/credits/data-table.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'
import { columns } from '~/components/table/credits/columns.tsx'
import { sortByRationalProperty } from '~/utils/misc.tsx'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)
	const timings = makeTimings('credit loader')

	const film = await time(
		() =>
			prisma.film.findUnique({
				where: {
					id: params.filmId,
				},
				select: {
					credits: {
						include: {
							person: true,
						},
					},
				},
			}),
		{ timings, type: 'find credits' },
	)

	if (!film) {
		throw new Response('Not found', { status: 404 })
	}

	const credits = film.credits.map(credit => ({
		id: credit.id,
		name: credit.person.name,
		character: credit.character,
		job: credit.job,
		department: credit.department,
		numerator: credit.numerator,
		denominator: credit.denominator,
	}))

	return json(
		{ credits: sortByRationalProperty(credits) },
		{ headers: { 'Server-Timing': timings.toString() } },
	)
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export default function FilmEditCredits() {
	const { credits } = useLoaderData<typeof loader>()

	return (
		<Container>
			{/* FIX: Dropdown resetting scroll */}
			<CreditTable data={credits} columns={columns} />
		</Container>
	)
}
