import { type Prisma, type Film, type FilmRating } from '@prisma/client'
import { prisma } from './db.server'

export class Petal {
	public async exportFilms(args: Prisma.FilmFindManyArgs): Promise<Film[]> {
		return prisma.film.findMany(args)
	}

	public async exportFilmRatings(
		args: Prisma.FilmRatingFindManyArgs,
	): Promise<FilmRating[]> {
		return prisma.filmRating.findMany(args)
	}
}
