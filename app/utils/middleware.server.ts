import { Prisma } from '@prisma/client'
import { prisma } from './db.server.ts'

export const initials = Prisma.defineExtension(client => {
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

// FIX: if i get this working remove log.ts
// update i don't think this will work as im not sure how to get the previous value, unless i pass it in?
// but then when the cast is updated and stuff that will be a pain
// unless i do a result for the cast table updating and i don't update the film in add cast i just update the cast table directly
export const log = Prisma.defineExtension(client => {
	return client.$extends({
		result: {
			film: {
				log: {
					needs: {},
					compute(film) {
						return (userId: string) =>
							prisma.auditLog.create({
								data: {
									action: film.id ? 'update' : 'create',
									entity: 'film',
									entityId: film.id,
									userId,
									changes: JSON.stringify({}),
								},
							})
					},
				},
			},
		},
	})
})

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
