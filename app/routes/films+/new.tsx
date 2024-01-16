import { type LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/router'
import { requireUserId } from '#app/utils/auth.server.ts'
import { FilmEditor, action } from './__film-editor.tsx'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserId(request)
	return json({})
}

export { action }
export default function NewFilmRoute() {
	return (
		<main className="container py-6">
			<FilmEditor />
		</main>
	)
}
