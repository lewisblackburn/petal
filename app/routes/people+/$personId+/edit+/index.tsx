import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Container } from '~/components/container.tsx'
import { PersonEditor } from '~/routes/resources+/person-editor.tsx'
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
	const timings = makeTimings('person loader')

	const person = await time(
		() =>
			prisma.person.findUnique({
				where: {
					id: params.personId,
				},
			}),
		{ timings, type: 'find person' },
	)

	if (!person) {
		throw new Response('Not found', { status: 404 })
	}

	const birthdate = new Date(person.birthdate ?? 0)
	const dayOfDeath = new Date(person.dayOfDeath ?? 0)

	return json(
		{
			person: {
				...person,
				birthdate: getDateTimeFormat(request)
					.format(birthdate)
					.split('/')
					.reverse()
					.join('-'),
				dayOfDeath: getDateTimeFormat(request)
					.format(dayOfDeath)
					.split('/')
					.reverse()
					.join('-'),
			},
		},
		{ headers: { 'Server-Timing': timings.toString() } },
	)
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export default function PersonEdit() {
	const { person } = useLoaderData<typeof loader>()

	return (
		<Container>
			<PersonEditor
				person={{
					id: person.id,
					name: person.name,
					knownForDepartment: person.knownForDepartment,
					biography: person.biography,
					birthdate: person.birthdate,
					dayOfDeath: person.dayOfDeath,
					gender: person.gender,
					placeOfBirth: person.placeOfBirth,
					homepage: person.homepage,
				}}
			/>
		</Container>
	)
}
