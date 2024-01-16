import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
	const users = await prisma.user.findMany({})
	const films = await prisma.film.findMany({})

	users.forEach(async user => {
		films.forEach(async film => {
			if (Math.random() > 0.5) return

			try {
				await prisma.filmRating.create({
					data: {
						userId: user.id,
						filmId: film.id,
						value: Math.floor(Math.random() * 5) + 1,
					},
				})
			} catch {}
		})
	})

	return json({
		success: true,
	})
}
