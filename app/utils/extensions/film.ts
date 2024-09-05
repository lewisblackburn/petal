import { Prisma } from '@prisma/client'
import { format } from 'date-fns'

export const filmFormatting = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'filmFormatting',
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

						const runtimeInHours = Math.floor(film.runtime / 60)
						const runtimeInMinutes = film.runtime % 60

						return `${runtimeInHours}h ${runtimeInMinutes}m`
					},
				},
			},
		},
	})
})
