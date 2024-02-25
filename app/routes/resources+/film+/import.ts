import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { prisma } from '#app/utils/db.server'
import { extractFileName, fetchAndUploadImages } from '#app/utils/misc'
import { requireUserWithRole } from '#app/utils/permissions.server'
import { s3UploadHandler } from '#app/utils/s3.server'
import {
	createOrUpdatePerson as createOrUpdatePersonAndConnectToFilm,
	fetchTMDBFilm,
} from '#app/utils/tmdb.service'
import { createToastHeaders } from '#app/utils/toast.server'

export const ImportFilmSchema = z.object({
	tmdbID: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserWithRole(request, 'admin')
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: ImportFilmSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { tmdbID } = submission.value

	const TMDBFilm = await fetchTMDBFilm(tmdbID)

	if (!TMDBFilm) {
		return json(
			{ result: submission.reply() },
			{
				headers: await createToastHeaders({
					description: 'That TMDB Film Does Not Exist.',
					type: 'error',
				}),
			},
		)
	}

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
	} = TMDBFilm

	const film = await prisma.film.findUnique({
		where: {
			tmdbID: TMDBFilm.id.toString(),
		},
	})

	if (film) {
		return json(
			{ result: submission.reply() },
			{
				headers: await createToastHeaders({
					description: 'That Film Already Exists.',
					type: 'error',
				}),
			},
		)
	}

	const [poster, backdrop] = await fetchAndUploadImages(
		[
			`https://image.tmdb.org/t/p/w500${poster_path}`,
			`https://image.tmdb.org/t/p/w500${backdrop_path}`,
		],
		s3UploadHandler,
	)

	const newFilm = await prisma.film.create({
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
			tmdbID: TMDBFilm.id.toString(),
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

	for (const castMember of credits.cast) {
		await createOrUpdatePersonAndConnectToFilm(castMember, newFilm.id, true)
	}

	for (const crewMember of credits.crew) {
		await createOrUpdatePersonAndConnectToFilm(crewMember, newFilm.id, false)
	}

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Imported film.',
				type: 'error',
			}),
		},
	)
}
