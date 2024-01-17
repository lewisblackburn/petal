import { type Film } from '@prisma/client'
import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import { prisma } from '#app/utils/db.server'

let lastFilm = 'clrh2enj2000qb812kgzlzhhp'

export async function loader({ request }: LoaderFunctionArgs) {
	console.log(lastFilm)
	const inputFilm = await prisma.film.findFirst({
		where: {
			id: lastFilm,
			// id: {
			// 	gt: lastFilm,
			// },
		},
		orderBy: {
			id: 'asc', // Order by ID in ascending order to get the next film
		},
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
		},
	})

	const films = await prisma.film.findMany({
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
		},
	})

	const recommended = films
		.map(film => ({
			...film,
			similarity: calculateSimilarity(inputFilm, film),
		}))
		.filter(film => film.id !== inputFilm.id) // Exclude the input film
		.sort((a, b) => b.similarity - a.similarity) // Sort in descending order

	const topFiveSimilarFilms = recommended.slice(0, 5)

	// TODO: I can probably update the other films in the top five similarty scores too at the same time?
	await prisma.film.update({
		where: { id: inputFilm.id },
		data: {
			recommendations: {
				// Delete previous recommended films
				deleteMany: {},
				create: topFiveSimilarFilms.map(film => ({
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

	lastFilm = inputFilm.id

	return json({ topFiveSimilarFilms })
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

export function calculateSimilarity(film1: Film, film2: Film): number {
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
	const castSimilarity = calculateCastSimilarity(film1.cast, film2.cast)

	// Adjust weights for different features based on their importance
	const textWeight = 0.05
	const runtimeWeight = 0.1
	const genreWeight = 0.5
	const castWeight = 0.3
	const keywordWeight = 0.05

	// Combine similarity scores with weights
	const overallSimilarity =
		textWeight * textSimilarity +
		runtimeWeight * runtimeSimilarity +
		genreWeight * calculateGenreSimilarity(film1.genres, film2.genres) +
		castWeight * castSimilarity +
		keywordWeight * calculateKeywordSimilarity(film1.keywords, film2.keywords)

	return overallSimilarity
}

// Function to calculate similarity for categorical data (genres)
export function calculateGenreSimilarity(
	genres1: { name: string }[],
	genres2: { name: string }[],
): number {
	const commonGenres = genres1.filter(genre1 =>
		genres2.some(genre2 => genre1.name === genre2.name),
	)

	const genreSimilarity =
		commonGenres.length / Math.sqrt(genres1.length * genres2.length)

	return genreSimilarity
}

// Function to calculate similarity for categorical data (keywords)
export function calculateKeywordSimilarity(
	keywords1: { name: string }[],
	keywords2: { name: string }[],
): number {
	const commonKeywords = keywords1.filter(kw1 =>
		keywords2.some(kw2 => kw1.name === kw2.name),
	)

	const keywordSimilarity =
		commonKeywords.length / Math.sqrt(keywords1.length * keywords2.length)

	return keywordSimilarity
}

// Function to calculate similarity for cast members
export function calculateCastSimilarity(
	cast1: { person: { name: string }; character: string }[],
	cast2: { person: { name: string }; character: string }[],
): number {
	if (cast1.length === 0 || cast2.length === 0) {
		return 0 // If either cast array is empty, similarity is 0
	}

	const commonCast = cast1.filter(member1 =>
		cast2.some(member2 => member1.person.name === member2.person.name),
	)

	const castSimilarity =
		commonCast.length / Math.sqrt(cast1.length * cast2.length)

	return castSimilarity
}
