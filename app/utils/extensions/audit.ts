import { Prisma } from '@prisma/client'
import { difference, equal } from '../misc'

const modelsToInclude: Prisma.ModelName[] = [
	// Film Models
	Prisma.ModelName.Film,
	Prisma.ModelName.FilmAlternateTitle,
	Prisma.ModelName.FilmCastMember,
	Prisma.ModelName.FilmCrewMember,
	Prisma.ModelName.FilmGenre,
	Prisma.ModelName.FilmKeyword,
	Prisma.ModelName.FilmPhoto,
	Prisma.ModelName.FilmReleaseInformation,
	Prisma.ModelName.FilmTagline,
	Prisma.ModelName.FilmVideo,
]

const uniqueOperations: Prisma.PrismaAction[] = [
	'create',
	'update',
	'delete',
	'upsert',
]

// TODO: I still need to implement this
const manyOperations: Prisma.PrismaAction[] = [
	'createMany',
	'updateMany',
	'deleteMany',
]

const nestedOperationsToInclude: string[] = ['genres', 'keywords']

const nestedCreateOperations: string[] = [
	'connect',
	'connectOrCreate',
	'connectMany',
]

const operationsToAudit: Prisma.PrismaAction[] =
	uniqueOperations.concat(manyOperations)
const fieldsToIgnore: string[] = ['updatedAt']

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
				// Exclude operations that can't be audited
				if (props.operation.includes('$')) return props.query(props.args)

				const { userId, modelId, ...args } = props.args as any
				const { operation, model } = props

				const shouldAudit =
					operationsToAudit.includes(operation) &&
					model &&
					modelsToInclude.includes(model)

				if (!shouldAudit) {
					return props.query({ ...args })
				}

				if (!userId) return props.query({ ...args })

				let oldValues = {}
				let newValues = {}

				const before =
					operation === 'create' ? {} : await getOldValue(client, props)

				// Remove select from args, so we can compare the before and after
				const removeSelectFromArgs = { ...args }
				delete removeSelectFromArgs.select
				// Perform the actual db operation
				const result = await props.query({ ...removeSelectFromArgs })

				const after = result

				const hasNestedFields = Object.keys(args).some(
					key => typeof args[key] === 'object',
				)

				// If the old and new values are the same, then we don't need to create an audit log (e.g. no changes were made)
				if (equal(before, after, fieldsToIgnore) && !hasNestedFields)
					return result

				const isDeleteOperation =
					operation === 'delete' || operation === 'deleteMany'

				oldValues = isDeleteOperation
					? before
					: difference(before, after, fieldsToIgnore).oldValues
				newValues = isDeleteOperation
					? {}
					: difference(before, after, fieldsToIgnore).newValues

				if (hasNestedFields) {
					for (const key in args.data) {
						if (nestedOperationsToInclude.includes(key)) {
							if (
								nestedCreateOperations.some(operation =>
									args.data[key].hasOwnProperty(operation),
								)
							) {
								newValues = { ...newValues, ...args.data }
							} else {
								oldValues = { ...oldValues, ...args.data }
							}
						}
					}
				}

				try {
					await client.$transaction(async $prisma => {
						await $prisma.filmEdit.create({
							data: {
								model: model || 'Unknown',
								operation,
								userId,
								// @ts-expect-error id and filmId are not always defined
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
