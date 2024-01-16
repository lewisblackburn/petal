import { prisma } from './db.server'

interface Recommendation {
	filmId: number
	title: string
	poster: string
	avgRating: number
}

// temporary recommendation system
export async function getFilmRecommendations(
	filmId: string,
	userId: string | null,
): Promise<Recommendation[]> {
	if (!userId) return []
	// The overall idea is to find films that users who rated the specified film (film.id)
	// have liked, excluding films already rated by the target user (userId). The recommendations
	// are then ordered by average rating, and only the top 5 films are returned.
	return prisma.$queryRaw<Recommendation[]>`
    SELECT r1.filmId, f.title, f.poster, AVG(r1.value) as avgRating
    FROM filmRating r1
    JOIN filmRating r2 ON r1.userId = r2.userId
    JOIN Film f ON r1.filmId = f.id
    WHERE r2.filmId = ${filmId}
      AND r1.filmId != ${filmId}
      AND r1.userId != ${userId ?? ''}
    GROUP BY r1.filmId
    ORDER BY avgRating DESC
    LIMIT 5;
  `
}
