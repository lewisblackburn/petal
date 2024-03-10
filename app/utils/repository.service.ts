import { type Film } from '@prisma/client'
import { type TMDBPerson, type TMDBFilm } from '#app/types/tmdb'
import { prisma } from './db.server'
import { extractFileName, fetchAndUploadImage, fetchWithDelay } from './misc'
import { s3UploadHandler } from './s3.server'

interface Repository {
	importFilm(filmId: string | number): Promise<Film | false>
	importTVShow(tvShowId: any): any
	importPerson(personId: any): any
	importCollection?(collectionId: any): any
	importReview?(reviewId: any): any
	importList?(listId: any): any
	importSeason?(seasonId: any): any
	importEpisode?(episodeId: any): any
	importNetwork?(networkId: any): any
}

export class TMDB implements Repository {
	constructor(public language: string = 'en-GB') {
		this.language = language
	}

	#TMDB_API_KEY = process.env.TMDB_API_KEY
	private TMDB_URL_V3 = 'https://api.themoviedb.org/3'
	private TMDB_URL_V4 = 'https://api.themoviedb.org/4'
	private TMDB_POSTER_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
	private TMDB_BACKDROP_URL =
		'https://media.themoviedb.org/t/p/w533_and_h300_bestv2'

	private TMDB_FILM_URL = (filmId: string, appendToResponse?: string) =>
		`${this.TMDB_URL_V3}/movie/${filmId}?append_to_response=${appendToResponse}&language=${this.language}`

	private TMDB_PERSON_URL = (personId: string, appendToResponse?: string) =>
		`${this.TMDB_URL_V3}/person/${personId}?append_to_response=${appendToResponse}&language=${this.language}`

	private async fetchFilm(filmId: string): Promise<TMDBFilm | false> {
		const result = await fetchWithDelay<TMDBFilm>(
			this.TMDB_FILM_URL(filmId, 'credits%2Ckeywords'),
			{
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${this.#TMDB_API_KEY}`,
				},
			},
			0,
		)

		if (result.error) {
			console.error(`Error fetching TMDB film: ${result.error.message}`)
			return false
		}

		return result.data || false
	}

	private async fetchPerson(personId: string): Promise<TMDBPerson | false> {
		const result = await fetchWithDelay<TMDBPerson>(
			this.TMDB_PERSON_URL(personId),
			{
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${this.#TMDB_API_KEY}`,
				},
			},
			100,
		)

		if (result.error) {
			console.error(`Error fetching TMDB person: ${result.error.message}`)
			return false
		}

		return result.data || false
	}

	public async addCastMemberToFilm(filmId: string, personId: string) {}
	public async addCrewMemberToFilm(filmId: string, personId: string) {}
	public async addKeywordToFilm(filmId: string, keywordId: string) {}
	public async addGenreToFilm(filmId: string, genreId: string) {}

	public async addPosterToFilm(
		film: Film,
		posterPath: string,
	): Promise<Film | false> {
		if (!film.tmdbID) return false

		const realPosterPath = `${this.TMDB_POSTER_URL}/${posterPath}`

		const poster = await fetchAndUploadImage(realPosterPath, s3UploadHandler)

		if (!poster) return false

		const updatedFilm = await prisma.film.update({
			where: {
				tmdbID: film.tmdbID,
			},
			data: {
				poster: poster,
				photos: {
					create: {
						type: 'poster',
						filename: extractFileName(poster),
						url: poster,
						language: 'English',
						primary: true,
					},
				},
			},
		})

		if (!updatedFilm) return false

		return updatedFilm
	}

	public async addBackdropToFilm(film: Film, backdropPath: string) {
		if (!film.tmdbID) return false

		const realBackdropPath = `${this.TMDB_BACKDROP_URL}/${backdropPath}`

		const backdrop = await fetchAndUploadImage(
			realBackdropPath,
			s3UploadHandler,
		)

		if (!backdrop) return false

		const updatedFilm = await prisma.film.update({
			where: {
				tmdbID: film.tmdbID,
			},
			data: {
				backdrop: backdrop,
				photos: {
					create: {
						type: 'backdrop',
						filename: extractFileName(backdrop),
						url: backdrop,
						language: 'English',
						primary: true,
					},
				},
			},
		})

		if (!updatedFilm) return false

		return updatedFilm
	}

	async importFilm(filmId: string): Promise<Film | false> {
		const film = {} as TMDBFilm
		// const film = await this.fetchFilm(filmId)

		if (!film) return false

		const isExistingFilm = await prisma.film.findUnique({
			where: {
				tmdbID: filmId,
			},
		})

		if (isExistingFilm) return isExistingFilm

		const importedFilm = await prisma.film.create({
			data: {
				title: film.title,
				tagline: film.tagline,
				overview: film.overview,
				runtime: film.runtime,
				budget: film.budget,
				status: film.status,
				revenue: film.revenue,
				releaseDate: new Date(film.release_date),
				tmdbID: filmId,
			},
		})

		if (!importedFilm) return false

		if (!film.poster_path) {
			console.error('No poster path found for film: could not import poster')
		} else {
			const poster = await this.addPosterToFilm(importedFilm, film.poster_path)
			if (!poster) {
				console.error('Failed to import poster for film')
			}
		}

		if (!film.backdrop_path) {
			console.error(
				'No backdrop path found for film: could not import backdrop',
			)
		} else {
			const backdrop = await this.addBackdropToFilm(
				importedFilm,
				film.poster_path,
			)

			if (!backdrop) {
				console.error('Failed to import backdrop for film')
			}
		}

		if (!film.credits.cast) {
			console.error('No cast found for film')
		} else {
			for (const castMember of film.credits.cast) {
				// TODO: Implement this method
				// await this.addCastMemberToFilm(filmId, castMember.id)
			}
		}

		return importedFilm
	}

	importTVShow(tvShowId: any) {
		throw new Error('Method not implemented.')
	}
	importPerson(personId: any) {
		throw new Error('Method not implemented.')
	}
	importCollection?(collectionId: any) {
		throw new Error('Method not implemented.')
	}
	importReview?(reviewId: any) {
		throw new Error('Method not implemented.')
	}
	importList?(listId: any) {
		throw new Error('Method not implemented.')
	}
	importSeason?(seasonId: any) {
		throw new Error('Method not implemented.')
	}
	importEpisode?(episodeId: any) {
		throw new Error('Method not implemented.')
	}
	importNetwork?(networkId: any) {
		throw new Error('Method not implemented.')
	}
}

export class IMDB implements Repository {
	constructor(
		private apiKey: string = process.env.IMDB_API_KEY ||
			'I need to add this to .env',
	) {
		this.apiKey = apiKey
	}

	importFilm(filmId: number): Promise<Film> {
		throw new Error('Method not implemented.')
	}
	importTVShow(tvShowId: any) {
		throw new Error('Method not implemented.')
	}
	importPerson(personId: any) {
		throw new Error('Method not implemented.')
	}
}
