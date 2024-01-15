import { Prisma } from '@prisma/client'
import { formatDistanceToNowStrict } from 'date-fns'

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
