import {
	type FilmCastMember,
	type FilmCrewMember,
	type FilmGenre,
	type Person,
	type Film,
} from '@prisma/client'
import {
	type TMDBPerson,
	type TMDBFilm,
	type TMDBCastMember,
	type TMDBCrewMember,
	type TMDBGenre,
	type TMDBKeyword,
	type TMDBSearchResult,
} from '#app/types/tmdb'
import { prisma } from './db.server'
import { extractFileName, fetchAndUploadImage, fetchWithDelay } from './misc'
import { s3UploadHandler } from './s3.server'

export abstract class Importer {
	public async addPosterToFilm(
		film: Film,
		posterPath: string | null,
	): Promise<Film | false> {
		if (!film.tmdbID || posterPath == null) return false

		if (film.poster !== '/img/300x450.png') return false

		const poster = await fetchAndUploadImage(posterPath, s3UploadHandler)

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

	public async addBackdropToFilm(film: Film, backdropPath: string | null) {
		if (!film.tmdbID || backdropPath == null) return false

		if (film.backdrop !== '/img/1920x1080.png') return false

		const backdrop = await fetchAndUploadImage(backdropPath, s3UploadHandler)

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

	public async addProfileToPerson(person: Person, profilePath: string | null) {
		if (!person.tmdbID || profilePath == null) return false

		if (person.image !== '/img/300x450.png') return false

		const profile = await fetchAndUploadImage(profilePath, s3UploadHandler)

		if (!profile) return false

		const updatedPerson = await prisma.person.update({
			where: {
				tmdbID: person.tmdbID,
			},
			data: {
				image: profile,
				photos: {
					create: {
						filename: extractFileName(profile),
						url: profilePath,
						primary: true,
					},
				},
			},
		})

		if (!updatedPerson) return false

		return updatedPerson
	}

	searchFilms?(filmTitle: string): any
	importFilm?(filmId: string | number): Promise<Film | false>
	importTVShow?(tvShowId: any): any
	importPerson?(personId: any): any
	importCollection?(collectionId: any): any
	importReview?(reviewId: any): any
	importList?(listId: any): any
	importSeason?(seasonId: any): any
	importEpisode?(episodeId: any): any
	importNetwork?(networkId: any): any
}

export class TMDB extends Importer {
	constructor(public language: string = 'en-GB') {
		super()
		this.language = language
	}

	#TMDB_API_KEY = process.env.TMDB_API_KEY
	private TMDB_URL_V3 = 'https://api.themoviedb.org/3'
	private TMDB_POSTER_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
	private TMDB_BACKDROP_URL =
		'https://media.themoviedb.org/t/p/w533_and_h300_bestv2'
	private TMDB_PROFILE_URL =
		'https://media.themoviedb.org/t/p/w300_and_h450_bestv2'
	private TMDB_FILM_URL = (filmId: string, appendToResponse?: string) =>
		`${this.TMDB_URL_V3}/movie/${filmId}?append_to_response=${appendToResponse}&language=${this.language}`
	private TMDB_PERSON_URL = (personId: string, appendToResponse?: string) =>
		`${this.TMDB_URL_V3}/person/${personId}?append_to_response=${appendToResponse}&language=${this.language}`
	private TMDB_FILM_GENRE_URL = (genreId: string) =>
		`${this.TMDB_URL_V3}/genre/movie/${genreId}/movies?language=${this.language}`
	private TMDB_SEARCH_URL = (
		query: string,
		pageIndex: number,
		type: string,
	) => {
		return `${this.TMDB_URL_V3}/search/${type}?query=${query}}&language=${this.language}&page=${pageIndex}`
	}

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

	private async fetchFilmGenre(genreId: string): Promise<TMDBGenre | false> {
		const result = await fetchWithDelay<TMDBGenre>(
			this.TMDB_FILM_GENRE_URL(genreId),
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
			console.error(`Error fetching TMDB genre: ${result.error.message}`)
			return false
		}

		return result.data || false
	}

	async importPerson(personId: string): Promise<Person | false> {
		const isExistingPerson = await prisma.person.findUnique({
			where: {
				tmdbID: personId,
			},
		})

		if (isExistingPerson) return isExistingPerson

		const person = await this.fetchPerson(personId)

		if (!person) return false

		const importedPerson = await prisma.person.create({
			data: {
				name: person.name,
				biography: person.biography,
				birthdate: new Date(person.birthday),
				dayOfDeath: new Date(person.deathday),
				placeOfBirth: person.place_of_birth,
				// gender: person.gender,
				homepage: person.homepage,
				knownForDepartment: person.known_for_department,
				tmdbID: personId,
			},
		})

		if (!importedPerson) return false

		return importedPerson
	}

	async importFilmGenre(
		genreId: string,
		genreName: string,
	): Promise<FilmGenre | false> {
		const isExistingFilmGenre = await prisma.filmGenre.findUnique({
			where: {
				name: genreName,
			},
		})

		if (isExistingFilmGenre) return isExistingFilmGenre

		const filmGenre = await this.fetchFilmGenre(genreId)

		if (!filmGenre) return false

		const importedFilmGenre = await prisma.filmGenre.create({
			data: {
				name: genreName,
			},
		})

		if (!importedFilmGenre) return false

		return importedFilmGenre
	}

	public async addCastMemberToFilm(
		film: Film,
		castMember: TMDBCastMember,
	): Promise<FilmCastMember | false> {
		const importedPerson = await this.importPerson(castMember.id.toString())

		if (!importedPerson) return false

		const existingCastMember = await prisma.filmCastMember.findFirst({
			where: {
				filmId: film.id,
				personId: importedPerson.id,
				character: castMember.character,
			},
		})

		if (existingCastMember) return existingCastMember

		const newCastMember = await prisma.filmCastMember.create({
			data: {
				film: {
					connect: {
						id: film.id,
					},
				},
				person: {
					connect: {
						id: importedPerson.id,
					},
				},
				character: castMember.character,
				numerator: castMember.order + 1,
				denominator: 1,
			},
		})

		if (!newCastMember) return false

		const profilePath = castMember.profile_path
			? this.TMDB_PROFILE_URL + castMember.profile_path
			: null
		await this.addProfileToPerson(importedPerson, profilePath)

		return newCastMember
	}

	public async addCrewMemberToFilm(
		film: Film,
		crewMember: TMDBCrewMember,
	): Promise<FilmCrewMember | false> {
		const importedPerson = await this.importPerson(crewMember.id.toString())

		if (!importedPerson) return false

		const existingCrewMember = await prisma.filmCrewMember.findFirst({
			where: {
				filmId: film.id,
				personId: importedPerson.id,
				department: crewMember.department,
				job: crewMember.job,
			},
		})

		if (existingCrewMember) return existingCrewMember

		const newCrewMember = await prisma.filmCrewMember.create({
			data: {
				film: {
					connect: {
						id: film.id,
					},
				},
				person: {
					connect: {
						id: importedPerson.id,
					},
				},
				department: crewMember.department,
				job: crewMember.job,
			},
		})

		if (!newCrewMember) return false

		const profilePath = crewMember.profile_path
			? this.TMDB_PROFILE_URL + crewMember.profile_path
			: null
		await this.addProfileToPerson(importedPerson, profilePath)

		return newCrewMember
	}

	public async addKeywordToFilm(film: Film, keyword: TMDBKeyword) {
		const updatedFilm = await prisma.film.update({
			where: { id: film.id },
			data: {
				keywords: {
					connectOrCreate: {
						where: {
							name: keyword.name,
						},
						create: {
							name: keyword.name,
						},
					},
				},
			},
		})

		if (!updatedFilm) return false

		return updatedFilm
	}

	public async addGenreToFilm(film: Film, genre: TMDBGenre) {
		const importedFilmGenre = await this.importFilmGenre(
			genre.id.toString(),
			genre.name,
		)

		if (!importedFilmGenre) return false

		const updatedFilm = await prisma.film.update({
			where: { id: film.id },
			data: {
				genres: {
					connect: {
						id: importedFilmGenre.id,
					},
				},
			},
		})

		if (!updatedFilm) return false

		return updatedFilm
	}

	async importFilm(filmId: string): Promise<Film | false> {
		const isExistingFilm = await prisma.film.findUnique({
			where: {
				tmdbID: filmId,
			},
		})

		if (isExistingFilm) return isExistingFilm

		const film = await this.fetchFilm(filmId)

		if (!film) return false

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

		const posterPath = film.poster_path
			? this.TMDB_POSTER_URL + film.poster_path
			: null
		await super.addPosterToFilm(importedFilm, posterPath)

		const backdropPath = film.backdrop_path
			? this.TMDB_BACKDROP_URL + film.backdrop_path
			: null
		await super.addBackdropToFilm(importedFilm, backdropPath)

		for (const castMember of film.credits.cast) {
			await this.addCastMemberToFilm(importedFilm, castMember)
		}

		for (const crewMember of film.credits.crew) {
			await this.addCrewMemberToFilm(importedFilm, crewMember)
		}

		for (const genre of film.genres) {
			await this.addGenreToFilm(importedFilm, genre)
		}

		for (const keyword of film.keywords.keywords) {
			await this.addKeywordToFilm(importedFilm, keyword)
		}

		return importedFilm
	}

	async searchFilms(
		filmTitle: string,
		pageIndex: number = 1,
	): Promise<TMDBSearchResult<TMDBFilm>> {
		return fetchWithDelay<any>(
			this.TMDB_SEARCH_URL(filmTitle, pageIndex, 'movie'),
			{
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${this.#TMDB_API_KEY}`,
				},
			},
			0,
		).then(response => response.data)
	}
}

export class IMDB extends Importer {
	constructor(
		private apiKey: string = process.env.IMDB_API_KEY ||
			'I need to add this to .env',
	) {
		super()
		this.apiKey = apiKey
	}
}

export const tmdb = new TMDB()
