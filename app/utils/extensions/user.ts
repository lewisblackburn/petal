import { Prisma } from '@prisma/client'

export const initials = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'initials',
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
