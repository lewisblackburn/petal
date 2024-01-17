import { type Keyword, type Film, type Genre } from '@prisma/client'
import { json } from '@remix-run/server-runtime'
import { prisma } from '#app/utils/db.server'

// TODOS
// TODO: 1. update respective films (this is more complicated than I throught)
//            - this needs to be done as say a new film is added, recommendations would
//              get added for it, but the film it got recommended would not get updated
//              and would have the old recommendations even though this film might match it.
//              I THINK I SOLVED THIS, just updated the updatedAt value of the respective films
//              so that next time the cron job runs, it will update the respective films too.
// TODO: 2. compartmentalise this file, fix errors ans make it more readable

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
		const recommended = existingFilms
			.map(existingFilm => ({
				...existingFilm,
				similarity: calculateSimilarity(updatedOrNewFilm, existingFilm),
			}))
			.filter(film => film.id !== updatedOrNewFilm.id) // Exclude the input film
			.sort((a, b) => b.similarity - a.similarity) // Sort in descending order
			.slice(0, 5) // Only keep the top 5 most similar films
		console.log('Updating: ', updatedOrNewFilm.title)
		//NOTE: I don't think this updates the updatedAt field, so It shouldn't create an endless OneDayAgo loop so to speak
		await prisma.film.update({
			where: { id: updatedOrNewFilm.id },
			data: {
				recommendations: {
					// Delete previous recommended films
					deleteMany: {},
					create: recommended.map(film => ({
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

	return json({})
}

// Function to calculate cosine similarity for text data
export function cosineSimilarity(text1: string, text2: string): number {
	// Tokenize the text into words
	const words1 = text1.split(' ')
	const words2 = text2.split(' ')

	// Create a set of unique words from both texts
	const uniqueWords = new Set([...words1, ...words2])

	// Create vectors for each text based on word frequency
	const vector1 = Array.from(uniqueWords).map(word =>
		words1.includes(word) ? 1 : 0,
	)
	const vector2 = Array.from(uniqueWords).map(word =>
		words2.includes(word) ? 1 : 0,
	)

	// Calculate cosine similarity
	const dotProduct = vector1.reduce(
		(sum, value, index) => sum + value * vector2[index],
		0,
	)
	const magnitude1 = Math.sqrt(
		vector1.reduce((sum, value) => sum + value ** 2, 0),
	)
	const magnitude2 = Math.sqrt(
		vector2.reduce((sum, value) => sum + value ** 2, 0),
	)

	if (magnitude1 === 0 || magnitude2 === 0) {
		return 0 // Avoid division by zero
	}

	return dotProduct / (magnitude1 * magnitude2)
}

// Function to calculate Euclidean distance for numerical data
export function euclideanDistance(number1: number, number2: number): number {
	return Math.abs(number1 - number2)
}

type FilmRecommendation = Film & {
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
		film1.title +
			' ' +
			film1.overview +
			' ' +
			film1.tagline +
			' ' +
			film1.genres.map(genre => genre.name).join(' ') +
			' ' +
			film1.keywords.map(kw => kw.name).join(' '),
		film2.title +
			' ' +
			film2.overview +
			' ' +
			film2.tagline +
			' ' +
			film2.genres.map(genre => genre.name).join(' ') +
			' ' +
			film2.keywords.map(kw => kw.name).join(' '),
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

export function calculateCategorySimilarity(
	category1: { name: string }[],
	category2: { name: string }[],
): number {
	const commonCategories = category1.filter(cat1 =>
		category2.some(cat2 => cat1.name === cat2.name),
	)

	if (commonCategories.length === 0) return 0

	const categorySimilarity =
		commonCategories.length / Math.sqrt(category1.length * category2.length)

	return categorySimilarity
}
