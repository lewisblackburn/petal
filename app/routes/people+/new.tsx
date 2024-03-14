import { json } from '@remix-run/router'
import { type LoaderFunctionArgs } from '@remix-run/server-runtime'
import { requireUserId } from '#app/utils/auth.server.ts'
import { PersonEditor } from './__person-editor.tsx'

export { action } from './__person-editor.server'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserId(request)
	return json({})
}

export default PersonEditor
