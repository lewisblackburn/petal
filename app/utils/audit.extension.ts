import { Prisma } from '@prisma/client'
import { difference, equal } from './misc'

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

				const shouldAudit =
					operationsToAudit.includes(operation) &&
					model &&
					modelsToInclude.includes(model)

				if (!shouldAudit) {
					return await props.query({ ...args })
				}

				if (!userId) return await props.query({ ...args })

				let oldValues =
					operation === 'create' ? {} : await getOldValue(client, props)
				let newValues = {}

				let before = {}
				before = oldValues

				// Remove select from args, so we can compare the before and after
				const removeSelectFromArgs = { ...args }
				delete removeSelectFromArgs.select

				// Perform the actual db operation
				const result = await props.query({ ...removeSelectFromArgs })

				const isDeleteOperation =
					operation === 'delete' || operation === 'deleteMany'

				const after = result

				// If the old and new values are the same, then we don't need to create an audit log (e.g. no changes were made)
				if (equal(before, after, fieldsToIgnore)) return result
				oldValues = isDeleteOperation
					? before
					: difference(before, after, fieldsToIgnore).oldValues
				newValues = difference(before, after, fieldsToIgnore).newValues

				try {
					await client.$transaction(async $prisma => {
						await $prisma.filmEdit.create({
							data: {
								model: model || 'Unknown',
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
