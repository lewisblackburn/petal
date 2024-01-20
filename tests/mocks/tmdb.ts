import { HttpResponse, http, type HttpHandler, passthrough } from 'msw'
import { isConnectedToTheInternet } from './utils.ts'

export const handlers: Array<HttpHandler> = [
	http.get(`https://api.themoviedb.org/3/movie/:movie`, async () => {
		if (await isConnectedToTheInternet()) return passthrough()

		return HttpResponse.json(null, { status: 404 })
	}),
	http.get(`https://image.tmdb.org/t/p/:size/:filename`, async () => {
		if (await isConnectedToTheInternet()) return passthrough()

		return HttpResponse.json(null, { status: 404 })
	}),
	http.get(`https://api.themoviedb.org/3/person/:id`, async () => {
		if (await isConnectedToTheInternet()) return passthrough()

		return HttpResponse.json(null, { status: 404 })
	}),
]
