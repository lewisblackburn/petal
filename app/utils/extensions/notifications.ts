import { Prisma } from '@prisma/client'

export const notifications = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'notifications',
		query: {
			user: {
				async create({ args, query }) {
					await client.notification.create({
						data: {
							title: 'Account Created',
							content: 'Your account has been created successfully',
							user: { connect: { id: args.data.id } },
						},
					})

					return query(args)
				},
			},
		},
	})
})
