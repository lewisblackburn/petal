import { Prisma } from '@prisma/client'
import { formatDistanceToNowStrict } from 'date-fns'

export const person = Prisma.defineExtension(client => {
	return client.$extends({
		result: {
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
