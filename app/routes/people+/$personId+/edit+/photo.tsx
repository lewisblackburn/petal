import { invariantResponse } from '@epic-web/invariant'
import { useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/person/photo/columns.tsx'
import { PhotoTable } from '#app/components/table/person/photo/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request, params }: DataFunctionArgs) {
	await requireUserId(request)

	const person = await prisma.person.findUnique({
		where: {
			id: params.personId,
		},
		select: {
			photos: true,
		},
	})

	invariantResponse(person, 'Not found', { status: 404 })

	const photos = person.photos.map(photo => ({
		id: photo.id,
		filename: photo.filename,
	}))

	return json({ photos })
}

export default function PersonEditPhotoRoute() {
	const { photos } = useLoaderData<typeof loader>()

	/* FIX: Dropdown resetting scroll */
	return <PhotoTable data={photos} columns={columns} />
}
