import { type Film } from '@prisma/client'
import { prisma } from './db.server'

interface Export {
	exportAllFilms(): Promise<Film[]>
}

export class Petal implements Export {
	async exportAllFilms(): Promise<Film[]> {
		return prisma.film.findMany({
			include: {
				cast: true,
				crew: true,
				genres: true,
				keywords: true,
			},
		})
	}
}
