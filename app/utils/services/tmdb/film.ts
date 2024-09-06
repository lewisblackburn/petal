import { type Film, type Prisma } from '@prisma/client'
import { type TMDBFilm } from '#app/types/tmdb.js'
import { prisma } from '#app/utils/db.server.js'
import { TMDB } from '.'

type FilmData =
	| (Prisma.Without<Prisma.FilmCreateInput, Prisma.FilmUncheckedCreateInput> &
			Prisma.FilmUncheckedCreateInput)
	| (Prisma.Without<Prisma.FilmUncheckedCreateInput, Prisma.FilmCreateInput> &
			Prisma.FilmCreateInput)

export class TMDBFilmImporter extends TMDB {
	async isExistingEntity(filmId: string): Promise<Film | null> {
		return prisma.film.findUnique({
			where: {
				tmdbID: filmId.toString(),
			},
		})
	}

	async saveEntity(data: FilmData): Promise<Film> {
		return prisma.film.create({
			data,
		})
	}

	async import(filmId: string): Promise<Film | false> {
		const existingFilm = await this.isExistingEntity(filmId)
		if (existingFilm) return existingFilm

		const film = await this.getEntity<TMDBFilm>(
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

		await this.uploadAndSaveProfileImage(film.credits.cast)
		await this.uploadAndSaveProfileImage(film.credits.crew)
		if (film.poster_path)
			await this.uploadAndSaveFilmImage(
				film.poster_path,
				'poster',
				importedFilm.id,
			)
		if (film.backdrop_path)
			await this.uploadAndSaveFilmImage(
				film.backdrop_path,
				'backdrop',
				importedFilm.id,
			)

		return importedFilm
	}

	private async uploadAndSaveProfileImage(
		people: TMDBFilm['credits']['cast'] | TMDBFilm['credits']['crew'],
	) {
		for (const person of people) {
			try {
				const profilePath = await this.uploadImage(
					this.getProfileImage(person.profile_path ?? ''),
					`person/${person.id}/profile`,
					person.profile_path?.replace('/', '') ?? '',
				)
				await prisma.person.update({
					where: { tmdbID: person.id.toString() },
					data: {
						tmdbID: person.id.toString(),
						name: person.name,
						image: profilePath || '',
						photos: {
							create: {
								url: profilePath || '',
								filename: person.profile_path?.replace('/', '') ?? '',
								primary: true,
							},
						},
					},
				})
			} catch {}
		}
	}

	private async uploadAndSaveFilmImage(
		path: string,
		type: 'poster' | 'backdrop',
		filmId: string,
	) {
		try {
			const imagePath = await this.uploadImage(
				type === 'poster'
					? this.getPosterImage(path)
					: this.getBackdropImage(path),
				`film/${filmId}/${type}`,
				path.replace('/', ''),
			)
			await prisma.film.update({
				where: { id: filmId },
				data: {
					[type]: imagePath || '',
					photos: {
						create: {
							url: imagePath || '',
							type,
							filename: path.replace('/', ''),
							primary: true,
						},
					},
				},
			})
		} catch {}
	}
}
