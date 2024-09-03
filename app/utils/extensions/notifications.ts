import { Prisma } from '@prisma/client'
import { sendNotification } from '../services/notification.service'

const modelsToInclude: Prisma.ModelName[] = [Prisma.ModelName.Film]

export const notifications = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'notifications',
		query: {
			$allModels: {
				async create(props) {
					const { userId, modelId, ...args } = props.args as any

					const model: any = await props.query(args)

					if (userId && modelsToInclude.includes(props.model)) {
						await sendNotification({
							userId,
							title: `${props.model} Added`,
							// TODO: Just say "You added a new film" instead of "You added a new Film: 1" and add a link to the film by storing the model ID in the notification
							content: `You added a new ${props.model}: ${model.id}`,
						})
					}

					return model
				},
			},
		},
	})
})
