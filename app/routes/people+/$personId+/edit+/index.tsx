import { json, type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'
import { PersonEditor, action } from '../../__person-editor.tsx'

export { action }

export async function loader({ params, request }: DataFunctionArgs) {
	await requireUserId(request)
	const person = await prisma.person.findFirst({
		select: {
			id: true,
			name: true,
			knownForDepartment: true,
			biography: true,
			birthdate: true,
			dayOfDeath: true,
			gender: true,
			placeOfBirth: true,
			homepage: true,
		},
		where: {
			id: params.personId,
		},
	})

	invariantResponse(person, 'Not found', { status: 404 })
	return json({ person })
}

export default function PersonEditRoute() {
	const data = useLoaderData<typeof loader>()

	return <PersonEditor person={data.person} />
}
