import { Prisma } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'

export const person = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'person',
		result: {
			person: {
				years: {
					needs: {
						birthdate: true,
					},
					compute(person) {
						if (!person.birthdate) return null

						const birthdate = new Date(person.birthdate)

						return formatDistanceToNow(birthdate)
					},
				},
			},
		},
	})
})
