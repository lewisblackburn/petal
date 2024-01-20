import { Prisma } from '@prisma/client'
import { format, formatDistanceToNowStrict } from 'date-fns'
import { formatRuntime } from './misc'

export const results = Prisma.defineExtension(client => {
	return client.$extends({
		result: {
			user: {
				initials: {
					needs: {
						name: true,
					},
					compute(user) {
						if (!user.name) return null

						return user.name
							.split(' ', 2) // only take the first two names
							.map((name: string) => name[0])
							.join('')
					},
				},
			},
			person: {
				years: {
					needs: {
						birthdate: true,
					},
					compute(person) {
						if (!person.birthdate) return null

						const birthdate = new Date(person.birthdate)

						return formatDistanceToNowStrict(birthdate)
					},
				},
			},
			film: {
				releaseDate: {
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

export const queries = Prisma.defineExtension(client => {
	return client.$extends({
		query: {
			user: {
				async $allOperations({ model, operation, args, query }) {
					return query(args)
				},
			},
			film: {
				// NOTE: Updates updatedAt to include relation tables (this is for the recommendations cron job)
				async $allOperations({ model, operation, args, query }) {
					const updatedAtOperations = [
						'create',
						'update',
						'updateMany',
						'upsert',
						'delete',
						'deleteMany',
					]
					// NOTE: Recommendations are not in this table as it would
					// create an infinite recommendation loop as recommendations
					// find recently updated films so this would update the
					// recommendaitons and then set the updatedAt to within the
					// week therfore the cron job would run on the same film again
					// These are the only tables that affect recommendations.
					const acceptedRelationTables = ['cast', 'genres', 'keywords']

					if (!updatedAtOperations.includes(operation)) return query(args)

					const accepted =
						// @ts-expect-error this will be there
						Object.keys(args.data ?? args ?? {}).filter(table =>
							acceptedRelationTables.includes(table),
						).length > 0

					if (!accepted) return query(args)

					// @ts-expect-error this will be there
					args.data.updatedAt = new Date()

					return query(args)
				},
			},
		},
	})
})

// https://github.com/prisma/prisma/discussions/20016
// export const queries = Prisma.defineExtension(client => {
// 	return client.$extends({
// 		query: {
// 			filmRating: {
// 				async $allOperations({ model, operation, args, query }) {
// 					const acceptedOperations = ['create', 'update', 'upsert', 'delete']
// 					if (!acceptedOperations.includes(operation)) return query(args)
//
// 					const result = await query(args)
// 					// @ts-expect-error this will be there
// 					const filmId = args.where.filmId_userId?.filmId ?? args.where.filmId
// 					const updatedAverageRating = await client.filmRating.aggregate({
// 						where: { filmId: filmId },
// 						_avg: { value: true },
// 					})
//
// 					await client.film.update({
// 						where: { id: filmId },
// 						data: {
// 							userScore: {
// 								set: updatedAverageRating._avg.value ?? 0,
// 							},
// 						},
// 					})
//
// 					return result
// 				},
// 			},
// 		},
// 	})
// })

// export const defaultTake = Prisma.defineExtension(client => {
//   return client.$extends({
//     query: {
//       $allModels: {
//         async findMany({ args, query }) {
//           args = { take: 20, ...args }
//
//           return query(args)
//         },
//       },
//     },
//   })
// })
