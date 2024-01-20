import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { prisma } from '#app/utils/db.server'
import {
	extractFileName,
	fetchAndUploadImages,
	fetchWithDelay,
} from '#app/utils/misc'
import { requireUserWithRole } from '#app/utils/permissions'
import { s3UploadHandler } from '#app/utils/s3.server'
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
	keywords: Keywords
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

export interface Keywords {
	keywords: Keyword[]
}

export interface Keyword {
	id: number
	name: string
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

	const url = `https://api.themoviedb.org/3/movie/${tmdbID}?append_to_response=credits%2Ckeywords&language=en-US`
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
				keywords,
				// original_language
			} = json

			const [poster, backdrop] = await fetchAndUploadImages(
				[
					`https://image.tmdb.org/t/p/w500${poster_path}`,
					`https://image.tmdb.org/t/p/w500${backdrop_path}`,
				],
				s3UploadHandler,
			)

			const film = await prisma.film.create({
				data: {
					title,
					tagline,
					overview,
					runtime,
					releaseDate: new Date(release_date),
					status,
					budget,
					revenue,
					poster,
					backdrop,
					photos: {
						create: [
							{
								type: 'poster',
								filename: extractFileName(poster),
								url: poster,
								language: 'English',
								primary: true,
							},
							{
								type: 'backdrop',
								filename: extractFileName(poster),
								url: backdrop,
								language: 'English',
								primary: true,
							},
						],
					},
					genres: {
						connectOrCreate: genres.map(genre => ({
							where: { name: genre.name },
							create: { name: genre.name },
						})),
					},
					keywords: {
						connectOrCreate: keywords.keywords.map(keyword => ({
							where: {
								name: keyword.name,
							},
							create: {
								name: keyword.name,
							},
						})),
					},
				},
			})

			// loop through cast and create person in database with name and birthdate
			for (const castMember of credits.cast) {
				const url = `https://api.themoviedb.org/3/person/${castMember.id}?language=en-US`
				const options = {
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
					},
				}

				const json = await fetchWithDelay<any>(url, options, 100)
				// NOTE: Try Catch on the off chance an actor has the same name and birthdate during import
				// NOTE: I can't use an upsert query here as I need to avoid creating duplicate person images
				try {
					// First, check if the person exists
					const existingPerson = await prisma.person.findUnique({
						where: {
							name_birthdate: {
								name: json.name,
								birthdate: new Date(json.birthday),
							},
						},
					})

					if (existingPerson) {
						// If the person exists, perform the update
						await prisma.person.update({
							where: {
								id: existingPerson.id,
							},
							data: {
								casts: {
									create: {
										film: {
											connect: {
												id: film.id,
											},
										},
										character: castMember.character,
										numerator: castMember.order + 1,
										denominator: 1,
									},
								},
							},
						})
					} else {
						// If the person doesn't exist, perform the create
						let image = null

						if (castMember.profile_path === null) image = null
						else {
							const [imageResult] = await fetchAndUploadImages(
								[`https://image.tmdb.org/t/p/w500${castMember.profile_path}`],
								s3UploadHandler,
							)
							image = imageResult
						}

						await prisma.person.create({
							data: {
								name: json.name,
								birthdate: json.birthday ? new Date(json.birthday) : null,
								image: image,
								photos: {
									create: {
										url: image,
										filename: extractFileName(image),
										primary: true,
									},
								},
								knownForDepartment: json.known_for_department,
								casts: {
									create: {
										film: {
											connect: {
												id: film.id,
											},
										},
										character: castMember.character,
										numerator: castMember.order + 1,
										denominator: 1,
									},
								},
							},
						})
					}
				} catch {}
			}

			// loop through crew and create person in database with name and birthdate
			for (const crewMember of credits.crew) {
				const url = `https://api.themoviedb.org/3/person/${crewMember.id}?language=en-US`
				const options = {
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
					},
				}

				const json = await fetchWithDelay<any>(url, options, 100)
				// NOTE: Try Catch on the off chance a person has the same name and birthdate during import
				// NOTE: I can't use an upsert query here as I need to avoid creating duplicate person images
				try {
					// First, check if the person exists
					const existingPerson = await prisma.person.findUnique({
						where: {
							name_birthdate: {
								name: json.name,
								birthdate: new Date(json.birthday),
							},
						},
					})

					if (existingPerson) {
						// If the person exists, perform the update
						await prisma.person.update({
							where: {
								id: existingPerson.id,
							},
							data: {
								crews: {
									create: {
										film: {
											connect: {
												id: film.id,
											},
										},
										job: crewMember.job,
										department: crewMember.department,
									},
								},
							},
						})
					} else {
						// If the person doesn't exist, perform the create
						let image = null

						if (crewMember.profile_path === null) image = null
						else {
							const [imageResult] = await fetchAndUploadImages(
								[`https://image.tmdb.org/t/p/w500${crewMember.profile_path}`],
								s3UploadHandler,
							)
							image = imageResult
						}

						await prisma.person.create({
							data: {
								name: json.name,
								birthdate: json.birthday ? new Date(json.birthday) : null,
								image: image,
								photos: {
									create: {
										url: image,
										filename: extractFileName(image),
										primary: true,
									},
								},
								knownForDepartment: crewMember.known_for_department,
								crews: {
									create: {
										film: {
											connect: {
												id: film.id,
											},
										},
										job: crewMember.job,
										department: crewMember.department,
									},
								},
							},
						})
					}
				} catch {}
			}
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
