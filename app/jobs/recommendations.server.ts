import { type Film, type FilmGenre, type FilmKeyword } from '@prisma/client'
import { intervalTrigger } from '@trigger.dev/sdk'
import { oneWeekAgo } from '#app/utils/constants'
import { prisma } from '#app/utils/db.server'
import { calculateSimilarity } from '#app/utils/misc'
import { client } from '#app/utils/trigger.server'

export const job = client.defineJob({
	id: 'recommendations',
	name: 'Recommendations Job: generate film recommendations',
	version: '0.0.1',
	trigger: intervalTrigger({
		seconds: 60 * 60 * 24 * 7, // Once a week (this should match the time period in recommendation params)
	}),
	run: async (payload, io, ctx) => {
		await io.runTask(
			'film-recommendations',
			async () => {
				await generateFilmRecommendations(oneWeekAgo())
			},
			{
				retry: {
					limit: 2,
					factor: 2,
					minTimeoutInMs: 1000 * 60, // 1 minute
					maxTimeoutInMs: 1000 * 60 * 10, // 10 minutes
				},
			},
		)

		await io.logger.info('✨ Success ✨')
	},
})

type FilmRecommendation = Partial<Film> & {
	genres: Pick<FilmGenre, 'name'>[]
	keywords: Pick<FilmKeyword, 'name'>[]
	cast: {
		person: {
			name: string
		}
		character: string
	}[]
}

const calculateFilmSimilarity = (
	film1: FilmRecommendation,
	film2: FilmRecommendation,
): number => {
	return calculateSimilarity({
		texts: [
			{
				text1: film1.title ?? '',
				text2: film2.title ?? '',
				weighting: 0.016,
			},
			{
				text1: film1.overview ?? '',
				text2: film2.overview ?? '',
				weighting: 0.016,
			},
			{
				text1: film1.tagline ?? '',
				text2: film2.tagline ?? '',
				weighting: 0.016,
			},
		],
		numbers: [
			{
				number1: film1.runtime ?? 0,
				number2: film2.runtime ?? 0,
				weighting: 0.05,
			},
		],
		categories: [
			{
				categories1: film1.keywords,
				categories2: film2.keywords,
				weighting: 0.052,
			},
			{
				categories1: film1.genres,
				categories2: film2.genres,
				weighting: 0.55,
			},
			{
				categories1: film1.cast.map((cast) => ({ name: cast.person.name })),
				categories2: film2.cast.map((cast) => ({ name: cast.person.name })),
				weighting: 0.3,
			},
		],
	})
}

export async function generateFilmRecommendations(
	updatedOrCreatedFilmFromDate: Date,
) {
	const existingFilms = await prisma.film.findMany({
		select: {
			id: true,
			runtime: true,
			title: true,
			overview: true,
			tagline: true,
			genres: {
				select: {
					name: true,
				},
			},
			keywords: {
				select: {
					name: true,
				},
			},
			cast: {
				select: {
					person: {
						select: {
							name: true,
						},
					},
					character: true,
				},
			},
			createdAt: true,
			updatedAt: true,
		},
	})

	// NOTE: Finds updated films within the last {time period} provided.
	const updatedOrNewFilms = existingFilms.filter((film) => {
		return (
			film.createdAt >= updatedOrCreatedFilmFromDate ||
			film.updatedAt >= updatedOrCreatedFilmFromDate
		)
	})

	for (const updatedOrNewFilm of updatedOrNewFilms) {
		const recommendedFilms = existingFilms
			.map((existingFilm) => ({
				...existingFilm,
				similarity: calculateFilmSimilarity(updatedOrNewFilm, existingFilm),
			}))
			.filter((film) => film.id !== updatedOrNewFilm.id) // Exclude the input film
			.sort((a, b) => b.similarity - a.similarity) // Sort in descending order
			.slice(0, 5) // Only keep the top 5 most similar films

		// NOTE: This operation is ignored in middleware, so it won't
		// trigger an infinite loop as the updatedAt field is not updated.
		// If it was updated, it would trigger the recommendations again.
		// This is the same for the next await prisma.film.update too.
		await prisma.film.update({
			where: { id: updatedOrNewFilm.id },
			data: {
				recommendations: {
					// Delete previous recommended films
					deleteMany: {},
					create: recommendedFilms.map((film) => ({
						film: {
							connect: {
								id: film.id,
							},
						},
						similarity: film.similarity,
					})),
				},
			},
		})
		console.log('Updated recommendations for film', updatedOrNewFilm.id)

		for (const recommendedFilm of recommendedFilms) {
			const recommendedRecommendedFilms = existingFilms
				.map((existingFilm) => ({
					...existingFilm,
					similarity: calculateFilmSimilarity(recommendedFilm, existingFilm),
				}))
				.filter((film) => film.id !== recommendedFilm.id) // Exclude the input film
				.sort((a, b) => b.similarity - a.similarity) // Sort in descending order
				.slice(0, 5) // Only keep the top 5 most similar films

			console.log('Updated recommendations for film', recommendedFilm.id)

			await prisma.film.update({
				where: { id: recommendedFilm.id },
				data: {
					recommendations: {
						// Delete previous recommended films
						deleteMany: {},
						create: recommendedRecommendedFilms.map((film) => ({
							film: {
								connect: {
									id: film.id,
								},
							},
							similarity: film.similarity,
						})),
					},
				},
			})
		}
	}
}
