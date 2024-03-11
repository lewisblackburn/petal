import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Petal } from '#app/utils/export.service.js'

// TODO: https://github.com/ZbynekPelunek/quotes-api-prisma-apiKeyMiddleware/blob/main/middleware/apikeys.js

export async function loader({ request }: LoaderFunctionArgs) {
	const petal = new Petal()
	const films = await petal.exportAllFilms()

	return json(films)
}