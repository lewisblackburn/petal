import { type Notification, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function sendNotification({
	userId,
	title,
	content,
}: Pick<Notification, 'userId' | 'title' | 'content'>) {
	await prisma.notification.create({
		data: {
			title,
			content,
			user: { connect: { id: userId } },
		},
	})
}
