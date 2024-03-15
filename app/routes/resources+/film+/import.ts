import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { TMDB } from '#app/utils/import.service.js'
import { requireUserWithRole } from '#app/utils/permissions.server'
import { createToastHeaders } from '#app/utils/toast.server'

export const ImportFilmSchema = z.object({
	tmdbID: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserWithRole(request, 'admin')
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: ImportFilmSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { tmdbID } = submission.value

	const tmdb = new TMDB()
	const importedFilm = await tmdb.importFilm(tmdbID)

	if (!importedFilm) {
		return json(
			{ result: submission.reply() },
			{
				headers: await createToastHeaders({
					description: 'Failed to import film.',
					type: 'error',
				}),
			},
		)
	}

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Imported film.',
				type: 'success',
			}),
		},
	)
}
