import { json } from '@remix-run/router'
import { type DataFunctionArgs } from '@remix-run/server-runtime'
import { requireUserId } from '~/utils/auth.server.ts'
import { Container } from '~/components/container.tsx'
import { PersonEditor } from '../resources+/person-editor.tsx'

export async function loader({ request }: DataFunctionArgs) {
	await requireUserId(request)
	return json({})
}

export default function NewPersonRoute() {
	return (
		<Container>
			<PersonEditor />
		</Container>
	)
}
