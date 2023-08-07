import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Container } from '~/components/container.tsx'
import { columns } from '~/components/table/keywords/columns.tsx'
import { KeywordTable } from '~/components/table/keywords/data-table.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { getDateTimeFormat } from '~/utils/misc.tsx'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)
	const timings = makeTimings('keywords loader')

	const film = await time(
		() =>
			prisma.film.findUnique({
				where: {
					id: params.filmId,
				},
				select: {
					keywords: true,
				},
			}),
		{ timings, type: 'find keywords' },
	)

	if (!film) {
		throw new Response('Not found', { status: 404 })
	}

	const keywords = film.keywords.map(keyword => ({
		id: keyword.id,
		name: keyword.name,
		created: getDateTimeFormat(request).format(keyword.createdAt),
		updated: getDateTimeFormat(request).format(keyword.updatedAt),
	}))

	return json(
		{ keywords },
		{ headers: { 'Server-Timing': timings.toString() } },
	)
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export default function FilmEditKeywords() {
	const { keywords } = useLoaderData<typeof loader>()

	return (
		<Container>
			<KeywordTable data={keywords} columns={columns} />
		</Container>
	)
}
