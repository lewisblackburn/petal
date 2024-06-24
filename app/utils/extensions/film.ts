import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { formatRuntime } from '../misc'

export const film = Prisma.defineExtension((client) => {
	return client.$extends({
		result: {
			film: {
				formattedReleaseDate: {
					needs: {
						releaseDate: true,
					},
					compute(film) {
						if (!film.releaseDate) return null

						return film.releaseDate
							? format(new Date(film.releaseDate), 'dd MMMM yyyy')
							: 'N/A'
					},
				},
				formattedRuntime: {
					needs: {
						runtime: true,
					},
					compute(film) {
						if (!film.runtime) return null

						return film.runtime ? formatRuntime(film.runtime) : null
					},
				},
			},
			filmRecommendation: {
				formattedSimilarity: {
					needs: {
						similarity: true,
					},
					compute(filmRecommendation) {
						if (!filmRecommendation.similarity) return null

						if (filmRecommendation.similarity === 1) return '100%'

						return `${Number(filmRecommendation.similarity * 100).toPrecision(
							2,
						)}%`
					},
				},
			},
		},
	})
})
