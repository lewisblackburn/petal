import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { STATUSES } from '#app/utils/constants'
import { prisma } from '#app/utils/db.server'
import { requireUserWithRole } from '#app/utils/permissions'
import { createToastHeaders } from '#app/utils/toast.server'

export interface TMDBFilm {
	adult: boolean
	backdrop_path: string
	belongs_to_collection: any
	budget: number
	genres: Genre[]
	homepage: string
	id: number
	imdb_id: string
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
	credits: Credits
}

export interface Genre {
	id: number
	name: string
}

export interface ProductionCompany {
	id: number
	logo_path: string
	name: string
	origin_country: string
}

export interface ProductionCountry {
	iso_3166_1: string
	name: string
}

export interface SpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}

export interface Credits {
	cast: Cast[]
	crew: Crew[]
}

export interface Cast {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path?: string
	cast_id: number
	character: string
	credit_id: string
	order: number
}

export interface Crew {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path?: string
	credit_id: string
	department: string
	job: string
}

export const ImportFilmFromTMDBSchema = z.object({
	tmdbID: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserWithRole(request, 'admin')
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: ImportFilmFromTMDBSchema,
	})
	if (!submission.value) {
		return json(
			{
				status: 'error',
				submission,
			} as const,
			{ status: 400 },
		)
	}

	let { tmdbID } = submission.value

	const url = `https://api.themoviedb.org/3/movie/${tmdbID}?append_to_response=credits&language=en-US`
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
		},
	}

	fetch(url, options)
		.then((res: Response) => {
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`)
			}
			return res.json() as Promise<TMDBFilm>
		})
		.then(async (json: TMDBFilm) => {
			const {
				title,
				tagline,
				overview,
				runtime,
				release_date,
				status,
				budget,
				revenue,
				genres,
				poster_path,
				backdrop_path,
				credits,
				// original_language
			} = json

			console.log()

			await prisma.film.create({
				data: {
					title,
					tagline,
					overview,
					runtime,
					releaseDate: new Date(release_date),
					status: STATUSES.find(s => s.label === status).value,
					budget,
					revenue,
					// TODO: This will need to be uploaded to our own server instead
					poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
					backdrop: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
					genres: {
						connectOrCreate: genres.map(genre => ({
							where: { name: genre.name },
							create: { name: genre.name },
						})),
					},
					cast: {
						create: credits.cast.map((cast, index) => ({
							person: {
								connectOrCreate: {
									where: {
										name_birthdate: {
											name: cast.name,
											// TODO: Can't get birthdate so will always create new person FIX THIS
											birthdate: new Date(),
										},
									},
									create: {
										name: cast.name,
										// TODO: This will need to be uploaded to our own server instead
										image: `https://image.tmdb.org/t/p/w500${cast.profile_path}`,
									},
								},
							},
							character: cast.character,
							numerator: index + 1,
							denominator: 1,
						})),
					},
				},
			})
		})
		.catch(async (err: Error) => {
			return json({ status: 'error', submission } as const, {
				headers: await createToastHeaders({
					description: 'That film does not exist on TMDB.',
					type: 'error',
				}),
			})
		})

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Added film to database.',
			type: 'error',
		}),
	})
}

export { action as ImportFilmFromTMDBAction }
