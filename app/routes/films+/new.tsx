import { json } from '@remix-run/router'
import { type DataFunctionArgs } from '@remix-run/server-runtime'
import { requireUserId } from '~/utils/auth.server.ts'
import { FilmEditor } from '../resources+/film-editor.tsx'
import { Container } from '~/components/container.tsx'

export async function loader({ request }: DataFunctionArgs) {
	await requireUserId(request)
	return json({})
}

export default function NewFilmRoute() {
	return (
		<Container>
			<FilmEditor />
		</Container>
	)
}
