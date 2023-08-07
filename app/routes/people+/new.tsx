import { json } from '@remix-run/router'
import { type DataFunctionArgs } from '@remix-run/server-runtime'
import { Container } from '~/components/container.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
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
