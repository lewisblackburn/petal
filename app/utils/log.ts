import { type Prisma } from '@prisma/client'
import { prisma } from './db.server'
import { difference } from './misc'

export const log = async (
	table: Prisma.ModelName,
	id: string,
	oldData: Object,
	newData: Object,
	userId: string,
) => {
	const diff = difference(oldData, newData)

	const diffArray = Object.entries(diff)
		.map(([key, value]) => ({
			property: key,
			newValue: value.newValue,
			oldValue: value.oldValue,
		}))
		.map(diff => {
			return {
				user: {
					connect: {
						id: userId,
					},
				},
				oldData: diff.oldValue,
				newData: diff.newValue,
				tableName: table.toLowerCase(),
				columnId: id,
				columnName: diff.property,
			}
		})

	// NOTE: SQLite does not support Prisma createMany
	// https://github.com/prisma/prisma/issues/10710
	const inserts = []
	for (const data of diffArray) {
		inserts.push(prisma.editLog.create({ data }))
	}

	await prisma.$transaction(inserts)
}
