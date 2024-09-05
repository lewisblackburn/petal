import { type Film, type Prisma } from '@prisma/client'
import { type TMDBFilm } from '#app/types/tmdb.js'
import { prisma } from '#app/utils/db.server.js'
import { TMDBImporter } from './importer'

type FilmData =
	| (Prisma.Without<Prisma.FilmCreateInput, Prisma.FilmUncheckedCreateInput> &
			Prisma.FilmUncheckedCreateInput)
	| (Prisma.Without<Prisma.FilmUncheckedCreateInput, Prisma.FilmCreateInput> &
			Prisma.FilmCreateInput)

export class TMDBFilmImporter extends TMDBImporter<Film> {
	async addPosterImage<Film>(): Promise<Film | false> {
		throw new Error('Method not implemented.')
	}

	async isExistingEntity(filmId: string): Promise<Film | null> {
		return prisma.film.findUnique({
			where: {
				tmdbID: filmId,
			},
		})
	}

	async saveEntity(data: FilmData): Promise<Film> {
		return prisma.film.create({
			data,
		})
	}

	async import(filmId: string): Promise<Film | false> {
		const existingFilm = await this.isExistingEntity(filmId.toString())
		if (existingFilm) return existingFilm

		const film = await this.tmdb.getEntity<TMDBFilm>(
			'movie',
			filmId,
			'keywords,credits,videos,images',
		)
		if (!film) return false

		const importedFilm = await this.saveEntity({
			title: film.title,
			tagline: film.tagline,
			overview: film.overview,
			runtime: film.runtime,
			budget: film.budget,
			status: film.status,
			revenue: film.revenue,
			releaseDate: new Date(film.release_date),
			tmdbID: film.id.toString(),
			imdbID: film.imdb_id,
			keywords: {
				connectOrCreate: film.keywords.keywords.map((keyword) => ({
					where: { name: keyword.name },
					create: { name: keyword.name },
				})),
			},
			genres: {
				connectOrCreate: film.genres.map((genre) => ({
					where: { name: genre.name },
					create: { name: genre.name },
				})),
			},
			cast: {
				create: film.credits.cast.map((person, index) => ({
					character: person.character,
					numerator: index + 1,
					denominator: 1,
					person: {
						connectOrCreate: {
							where: { tmdbID: person.id.toString() },
							create: {
								tmdbID: person.id.toString(),
								name: person.name,
							},
						},
					},
				})),
			},
			crew: {
				create: film.credits.crew.map((person) => ({
					job: person.job,
					department: person.department,
					person: {
						connectOrCreate: {
							where: { tmdbID: person.id.toString() },
							create: {
								tmdbID: person.id.toString(),
								name: person.name,
							},
						},
					},
				})),
			},
			productionCompanies: {
				connectOrCreate: film.production_companies.map((company) => ({
					where: { name: company.name },
					create: {
						name: company.name,
						country: company.origin_country,
					},
				})),
			},
		})

		if (film.poster_path) {
			const posterPath = await this.tmdb.getPosterImage(film.poster_path)
			// Save the posterPath if needed
		}

		if (film.backdrop_path) {
			const backdropPath = await this.tmdb.getBackdropImage(film.backdrop_path)
			// Save the backdropPath if needed
		}

		return importedFilm
	}
}
