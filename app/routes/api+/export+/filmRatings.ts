import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { validateApiKey } from '#app/utils/api.server'
import { Petal } from '#app/utils/export.service'

export async function loader({ request }: LoaderFunctionArgs) {
	const apiKey = await validateApiKey(request)

	if (!apiKey) throw json({ message: 'Unauthorized' }, { status: 403 })

	const petal = new Petal()
	const films = await petal.exportFilmRatings({
		select: {
			filmId: true,
			userId: true,
			value: true,
		},
	})

	return json(films)
}
