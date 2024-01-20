import { HttpResponse, http, type HttpHandler, passthrough } from 'msw'
import { isConnectedToTheInternet } from './utils.ts'

export const handlers: Array<HttpHandler> = [
	http.all(
		`https://${process.env.STORAGE_BUCKET}.s3.${process.env.STORAGE_REGION}.amazonaws.com/:filename`,
		async () => {
			if (await isConnectedToTheInternet()) return passthrough()

			return HttpResponse.json(null, { status: 404 })
		},
	),
]
