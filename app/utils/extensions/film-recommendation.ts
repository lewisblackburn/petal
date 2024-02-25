import { Prisma } from '@prisma/client'

const modelsToInclude: Prisma.ModelName[] = [
	Prisma.ModelName.FilmCastMember,
	Prisma.ModelName.FilmGenre,
	Prisma.ModelName.FilmKeyword,
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

/**
 * Defines a Prisma extension for film recommendations.
 * This extension modifies the behavior of the `film` query operations by updating the `updatedAt` field in the data before executing the query.
 * This means that the 'updatedAt' field will be updated whenever a film or a related model e.g. 'FilmCastMember' is created, updated, or deleted. This allows the film to be included in the recommendations cron job when a film or related model is updated.
 * The modification is applied only to specified operations and models.
 *
 * @param client - The Prisma client instance.
 * @returns The extended Prisma client.
 */
export const filmRecommendation = Prisma.defineExtension(client => {
	return client.$extends({
		query: {
			film: {
				async $allOperations(props) {
					const { operation, model, query } = props

					const shouldChange =
						operationsToAudit.includes(operation) &&
						model &&
						modelsToInclude.includes(model)

					if (!shouldChange) {
						return await query({ ...props.args })
					}

					const args = props.args as any

					args.data.updatedAt = new Date()

					return query(args)
				},
			},
		},
	})
})
