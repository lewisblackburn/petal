import { type Keyword, type Film, type Genre } from '@prisma/client'
import { prisma } from '#app/utils/db.server'
import {
	calculateCategorySimilarity,
	cosineSimilarity,
	euclideanDistance,
} from './misc'

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

	const updatedOrNewFilms = existingFilms.filter(film => {
		return (
			film.createdAt >= updatedOrCreatedFilmFromDate ||
			film.updatedAt >= updatedOrCreatedFilmFromDate
		)
	})

	for (const updatedOrNewFilm of updatedOrNewFilms) {
		const recommendedFilms = existingFilms
			.map(existingFilm => ({
				...existingFilm,
				similarity: calculateSimilarity(updatedOrNewFilm, existingFilm),
			}))
			.filter(film => film.id !== updatedOrNewFilm.id) // Exclude the input film
			.sort((a, b) => b.similarity - a.similarity) // Sort in descending order
			.slice(0, 5) // Only keep the top 5 most similar films

		// NOTE: This operation is ignored in middleware, so it won't
		// trigger an infinite loop as the updatedAt field is not updated.
		// If it was updated, it would trigger the recommendations again.
		await prisma.film.update({
			where: { id: updatedOrNewFilm.id },
			data: {
				recommendations: {
					// Delete previous recommended films
					deleteMany: {},
					create: recommendedFilms.map(film => ({
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
				.map(existingFilm => ({
					...existingFilm,
					similarity: calculateSimilarity(recommendedFilm, existingFilm),
				}))
				.filter(film => film.id !== recommendedFilm.id) // Exclude the input film
				.sort((a, b) => b.similarity - a.similarity) // Sort in descending order
				.slice(0, 5) // Only keep the top 5 most similar films

			console.log('Updated recommendations for film', recommendedFilm.id)

			await prisma.film.update({
				where: { id: recommendedFilm.id },
				data: {
					recommendations: {
						// Delete previous recommended films
						deleteMany: {},
						create: recommendedRecommendedFilms.map(film => ({
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

type FilmRecommendation = Partial<Film> & {
	genres: Pick<Genre, 'name'>[]
	keywords: Pick<Keyword, 'name'>[]
	cast: {
		person: {
			name: string
		}
		character: string
	}[]
}

export function calculateSimilarity(
	film1: FilmRecommendation,
	film2: FilmRecommendation,
): number {
	// Calculate similarity for text data (e.g., title, overview, tagline, genres, keywords)
	const textSimilarity = cosineSimilarity(
		film1.title + ' ' + film1.overview + ' ' + film1.tagline,
		film2.title + ' ' + film2.overview + ' ' + film2.tagline,
	)

	// Calculate similarity for numerical data (e.g., runtime)
	const runtimeSimilarity =
		1 / (1 + euclideanDistance(film1.runtime ?? 0, film2.runtime ?? 0))

	// Calculate similarity for cast members
	const castSimilarity = calculateCategorySimilarity(
		film1.cast.map(castMember => ({ name: castMember.person.name })),
		film2.cast.map(castMember => ({ name: castMember.person.name })),
	)
	const genreSimilarity = calculateCategorySimilarity(
		film1.genres,
		film2.genres,
	)
	const keywordSimilarity = calculateCategorySimilarity(
		film1.keywords,
		film2.keywords,
	)

	// Adjust weights for different features based on their importance
	const textWeight = 0.05
	const runtimeWeight = 0.05
	const genreWeight = 0.55
	const castWeight = 0.3
	const keywordWeight = 0.05

	// Combine similarity scores with weights
	const overallSimilarity =
		textWeight * textSimilarity +
		runtimeWeight * runtimeSimilarity +
		genreWeight * genreSimilarity +
		castWeight * castSimilarity +
		keywordWeight * keywordSimilarity

	return overallSimilarity
}
