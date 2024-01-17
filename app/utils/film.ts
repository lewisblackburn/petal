export const updateFilmVoteAverageAndCount = async (
	prisma: any,
	filmId: string,
) => {
	const updatedAverageRating = await prisma.filmRating.aggregate({
		where: { filmId: filmId },
		_avg: { value: true },
		_count: { value: true },
	})

	await prisma.film.update({
		where: { id: filmId },
		data: {
			voteAverage: {
				set: updatedAverageRating._avg.value ?? 0,
			},

			voteCount: {
				set: updatedAverageRating._count.value ?? 0,
			},
		},
	})
}
