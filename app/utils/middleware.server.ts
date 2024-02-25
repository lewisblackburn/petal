import { Prisma } from '@prisma/client'
import { format, formatDistanceToNowStrict } from 'date-fns'
import { difference, equal, formatRuntime } from './misc'

const modelsToInclude: Prisma.ModelName[] = [
	Prisma.ModelName.Film,
	Prisma.ModelName.FilmCastMember,
	Prisma.ModelName.FilmCrewMember,
	Prisma.ModelName.FilmPhoto,
]

const uniqueOperations: Prisma.PrismaAction[] = [
	'create',
	'update',
	'delete',
	'upsert',
]
const manyOperations: Prisma.PrismaAction[] = [
	'createMany',
	'updateMany',
	'deleteMany',
]
const operationsToAudit: Prisma.PrismaAction[] =
	uniqueOperations.concat(manyOperations)
const fieldsToIgnore: string[] = ['updatedAt'] // Add fields to always ignore in difference function

// TODO: Prisma.Extension['query']
const getOldValue = async (client: any, params: any) => {
	const { model, operation, args } = params

	if (model) {
		if (uniqueOperations.includes(operation)) {
			const result = await client[model].findUnique({ where: args.where })
			return result === null ? {} : result
		} else if (manyOperations.includes(operation)) {
			const result = await client[model].findMany({ where: args.where })
			return result === null ? {} : result
		} else {
			console.warn('Unhandeled operation: ', operation)
			return {}
		}
	}

	console.warn("Model doesn't exist")
	return {}
}

export const auditLog = Prisma.defineExtension(client => {
	return client.$extends({
		query: {
			async $allOperations(props) {
				// These exludes all raw execution e.g. queryRaw, executeRaw, etc
				// This may also exlcude $transaction queries which might be helpful actually!
				if (props.operation.includes('$')) return await props.query(props.args)
				const { userId, modelId, ...args } = props.args as any
				const { operation, model } = props

				if (
					!operationsToAudit.includes(operation) ||
					!model ||
					!modelsToInclude.includes(model)
				) {
					return await props.query({ ...args })
				}

				// If there is no user, then we can't create an audit log
				if (!userId) return await props.query({ ...args })

				let oldValues = {}
				let newValues = {}
				let modelIds: string[] = []

				const isCreateOperation = operation === 'create'

				let before = {}

				if (isCreateOperation) {
					before = {}
				} else {
					before = await getOldValue(client, props)
				}

				if (before === null) before = {}

				if (manyOperations.includes(operation)) {
					modelIds = before.map((item: any) => item.id)
				}

				// Remove select from args, so we can compare the before and after
				const removeSelectFromArgs = { ...args }
				delete removeSelectFromArgs.select

				// Check if it is a new or existing record
				// const isNewRecord = !args.hasOwnProperty('where')

				// Perform the actual db operation
				const result = await props.query({ ...removeSelectFromArgs })

				const isDeleteOperation =
					operation === 'delete' || operation === 'deleteMany'

				// No need to get result data on delete as it will be null
				if (isDeleteOperation) {
					oldValues = before
				} else {
					const after = result

					// If the old and new values are the same, then we don't need to create an audit log (e.g. no changes were made)
					if (equal(before, after, fieldsToIgnore)) return result

					if (
						operation === 'updateMany' &&
						Array.isArray(before) &&
						Array.isArray(after)
					) {
						// Get the difference between the first item in array, because update will be the same for all items
						oldValues = difference(
							before[0],
							after[0],
							fieldsToIgnore,
						).oldValues
						newValues = difference(
							before[0],
							after[0],
							fieldsToIgnore,
						).newValues
					} else {
						oldValues = difference(before, after, fieldsToIgnore).oldValues
						newValues = difference(before, after, fieldsToIgnore).newValues
					}
				}

				try {
					await client.$transaction(async $prisma => {
						await $prisma.filmEdit.create({
							data: {
								model,
								operation,
								userId,
								filmId: modelId ?? newValues?.id ?? newValues?.filmId,
								oldValues: JSON.stringify(oldValues),
								newValues: JSON.stringify(newValues),
							},
						})
						await $prisma.user.update({
							where: { id: userId },
							data: { totalEdits: { increment: 1 } },
						})
					})
				} catch (e) {
					// Don't throw error if audit fails, only log it
					console.error('Failed to create Audit', e)
				}

				return result
			},
		},
	})
})

export const user = Prisma.defineExtension(client => {
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
		},
	})
})

export const person = Prisma.defineExtension(client => {
	return client.$extends({
		result: {
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
		},
	})
})

export const film = Prisma.defineExtension(client => {
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
		query: {
			film: {
				// NOTE: Updates updatedAt to include relation tables being updated (this is for the recommendations cron job)
				async $allOperations({ model, operation, args, query }) {
					const updatedAtOperations = [
						'create',
						'update',
						'updateMany',
						'upsert',
						'delete',
						'deleteMany',
					]
					// NOTE: Recommendations are not in this array as it would
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
