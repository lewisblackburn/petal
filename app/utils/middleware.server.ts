import { Prisma } from '@prisma/client'
import { formatDistanceToNowStrict } from 'date-fns'
import { prisma } from './db.server.ts'

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
		},
	})
})

export const log = Prisma.defineExtension(client => {
	return client.$extends({
		query: {
			film: {
				async upsert({ args, query, model, operation }) {
					return query(args)
					// const [result] = await prisma.$transaction([query(args)]) // wrap the query in a batch transaction, and destructure the result to return an array
					// return result // return the first result found in the array
					// const [previousData, nextData]: any = await prisma.$transaction([
					// prisma.film.findUnique({
					// 	where: { id: args.where.id ?? '__new_film__' },
					// }),
					// query(args),
					// ])

					// @ts-expect-error TODO: Fix prisma client type
					// const userId = prisma.userId
					// console.log(userId)

					// console.log(previousData, nextData)

					// return previousData
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
