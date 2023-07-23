import type { ActionFunction } from '@remix-run/node'
import { unstable_parseMultipartFormData } from '@remix-run/node'
import { authenticator } from '~/utils/auth.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'
import { s3UploaderHandler } from '~/utils/s3.server.ts'

// TODO: Add schema validation and error handling

export const action: ActionFunction = async ({ request }) => {
	await authenticator.isAuthenticated(request, { failureRedirect: '/login' })

	const formData = await unstable_parseMultipartFormData(
		request,
		s3UploaderHandler,
	)

	const fileName = formData.get('upload')

	return redirectWithToast('/', {
		title: fileName?.toString() + ' uploaded',
	})
}
