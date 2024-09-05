import { Prisma, type Film } from '@prisma/client'
import { prisma } from '../db.server'

export class TMDB {
	constructor(public language: string = 'en-GB') {
		this.language = language
	}

	#TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN
	private TMDB_URL_V3 = 'https://api.themoviedb.org/3'
	private TMDB_POSTER_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
	private TMDB_BACKDROP_URL =
		'https://media.themoviedb.org/t/p/w533_and_h300_bestv2'
	private TMDB_PROFILE_URL =
		'https://media.themoviedb.org/t/p/w300_and_h450_bestv2'

	private TMDB_ENTITY_URL = (
		type: string,
		id: string,
		appendToResponse?: string,
	) =>
		`${this.TMDB_URL_V3}/${type}/${id}?append_to_response=${appendToResponse}&language=${this.language}`

	private TMDB_SEARCH_URL = (
		query: string,
		pageIndex: number,
		type: string,
	) => {
		return `${this.TMDB_URL_V3}/search/${type}?query=${query}&language=${this.language}&page=${pageIndex}`
	}

	async fetch<T>(url: string) {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${this.#TMDB_ACCESS_TOKEN}`,
			},
		})
		return response.json() as Promise<T>
	}

	async getPosterImage(posterPath: string) {
		return `${this.TMDB_POSTER_URL}${posterPath}`
	}

	async getBackdropImage(backdropPath: string) {
		return `${this.TMDB_BACKDROP_URL}${backdropPath}`
	}

	async getEntity<T>(
		type: string,
		id: string,
		appendToResponse: string = '',
	): Promise<T> {
		return this.fetch<T>(this.TMDB_ENTITY_URL(type, id, appendToResponse))
	}

	async search<T>(query: string, pageIndex: number, type: string): Promise<T> {
		return this.fetch(this.TMDB_SEARCH_URL(query, pageIndex, type))
	}
}

const tmdb = new TMDB()
export { tmdb }
