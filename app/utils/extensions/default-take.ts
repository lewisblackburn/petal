import { Prisma } from '@prisma/client'

export const defaultTake = Prisma.defineExtension(client => {
	return client.$extends({
		query: {
			$allModels: {
				async findMany({ args, query }) {
					args = { take: 20, ...args }

					return query(args)
				},
			},
		},
	})
})
