import { PassThrough, Readable } from 'stream'
import { uploadStreamToS3 } from '../../s3.server'

export class TMDB {
	private readonly TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN
	private readonly TMDB_URL_V3 = 'https://api.themoviedb.org/3'
	private readonly TMDB_POSTER_URL =
		'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
	private readonly TMDB_BACKDROP_URL =
		'https://media.themoviedb.org/t/p/w533_and_h300_bestv2'
	private readonly TMDB_PROFILE_URL =
		'https://media.themoviedb.org/t/p/w300_and_h450_bestv2'

	constructor(public language: string = 'en-GB') {}

	private TMDB_ENTITY_URL(type: string, id: string, appendToResponse?: string) {
		return `${this.TMDB_URL_V3}/${type}/${id}?append_to_response=${appendToResponse}&language=${this.language}`
	}

	private TMDB_SEARCH_URL(query: string, pageIndex: number, type: string) {
		return `${this.TMDB_URL_V3}/search/${type}?query=${query}&language=${this.language}&page=${pageIndex}`
	}

	private async fetch<T>(url: string): Promise<T> {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${this.TMDB_ACCESS_TOKEN}`,
			},
		})
		return response.json() as Promise<T>
	}

	public getProfileImage(profilePath: string): string {
		return `${this.TMDB_PROFILE_URL}${profilePath}`
	}

	public getPosterImage(posterPath: string): string {
		return `${this.TMDB_POSTER_URL}${posterPath}`
	}

	public getBackdropImage(backdropPath: string): string {
		return `${this.TMDB_BACKDROP_URL}${backdropPath}`
	}

	public async getEntity<T>(
		type: string,
		id: string,
		appendToResponse: string = '',
	): Promise<T> {
		return this.fetch<T>(this.TMDB_ENTITY_URL(type, id, appendToResponse))
	}

	public async search<T>(
		query: string,
		pageIndex: number,
		type: string,
	): Promise<T> {
		return this.fetch(this.TMDB_SEARCH_URL(query, pageIndex, type))
	}

	public async uploadImage(
		imageUrl: string,
		folder: string,
		filename: string,
	): Promise<string | undefined> {
		try {
			const response = await fetch(imageUrl)

			if (!response.ok) {
				throw new Error(`Failed to fetch file from URL: ${response.statusText}`)
			}

			const passThrough = new PassThrough()
			const reader = response.body?.getReader()

			if (reader) {
				const stream = new Readable({
					read(_size) {
						reader
							.read()
							.then(({ done, value }) => {
								if (done) {
									this.push(null)
								} else {
									this.push(value)
								}
							})
							.catch((err) => this.destroy(err))
					},
				})

				stream.pipe(passThrough)
				return uploadStreamToS3(passThrough, filename, folder)
			} else {
				throw new Error('Failed to get readable stream from response body.')
			}
		} catch (error) {
			console.error(`Error fetching or uploading file: ${error}`)
			throw error
		}
	}
}

const tmdb = new TMDB()
export { tmdb }
