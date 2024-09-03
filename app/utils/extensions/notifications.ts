import { Prisma } from '@prisma/client'
import { sendNotification } from '../services/notification.service'

export const notifications = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'notifications',
		query: {
			film: {
				async create(props) {
					const { userId, modelId, ...args } = props.args as any

					const film = await props.query(args)

					if (userId) {
						await sendNotification({
							userId,
							title: 'Film Added',
							content: `You added a new film: ${film.title}`,
						})
					}

					return film
				},
			},
		},
	})
})
