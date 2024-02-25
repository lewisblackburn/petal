import {
	type TMDBPerson,
	type TMDBFilm,
	type TMDBExtendedMember,
} from '#app/types/tmdb'
import { PETAL_BOT_ID } from './constants'
import { prisma } from './db.server'
import { extractFileName, fetchAndUploadImage, fetchWithDelay } from './misc'
import { s3UploadHandler } from './s3.server'

export async function fetchTMDBFilm(tmdbID: string): Promise<TMDBFilm | false> {
	const result = await fetchWithDelay<TMDBFilm>(
		`https://api.themoviedb.org/3/movie/${tmdbID}?append_to_response=credits%2Ckeywords&language=en-GB`,
		{
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
			},
		},
		0,
	)

	if (result.error) {
		console.error(`Error fetching TMDB film: ${result.error.message}`)
		return false
	}

	return result.data || false
}

const fetchTMDBPersonAndUploadImage = async (
	personID: number,
	profilePath: string | null,
	s3UploadHandler: any,
) => {
	const fetchedPerson = await fetchWithDelay<TMDBPerson>(
		`https://api.themoviedb.org/3/person/${personID}?language=en-GB`,
		{
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
			},
		},
		100,
	)

	if (fetchedPerson.error) {
		console.error(`Error fetching TMDB person: ${fetchedPerson.error.message}`)
		return { person: null, fetchedPerson: null, image: null }
	}

	const person = await prisma.person.findUnique({
		where: { tmdbID: personID.toString() },
	})

	let image = null

	if (!person) {
		if (profilePath !== null) {
			image = await fetchAndUploadImage(
				`https://image.tmdb.org/t/p/w500${profilePath}`,
				s3UploadHandler,
			)
		}
	}

	return { person, fetchedPerson: fetchedPerson.data, image }
}

export const createOrUpdatePerson = async (
	creditMember: TMDBExtendedMember,
	filmId: string,
	isCast: boolean,
) => {
	const { person, fetchedPerson, image } = await fetchTMDBPersonAndUploadImage(
		creditMember.id,
		creditMember.profile_path ?? null,
		s3UploadHandler,
	)

	if (fetchedPerson === null || fetchedPerson === undefined) return

	const personData: any = {
		name: creditMember.name,
		birthdate: fetchedPerson.birthday ? new Date(fetchedPerson.birthday) : null,
		tmdbID: fetchedPerson.id.toString(),
	}

	if (image) {
		personData.image = image
		personData.photos = {
			create: {
				filename: extractFileName(image),
				url: image,
				primary: true,
			},
		}
	}

	if (isCast) {
		personData.casts = {
			create: {
				film: {
					connect: { id: filmId },
				},
				// @ts-expect-error this will exist
				character: creditMember.character,
				// @ts-expect-error this will exist
				numerator: creditMember.order + 1,
				denominator: 1,
			},
		}
	} else {
		personData.crews = {
			create: {
				film: {
					connect: { id: filmId },
				},
				// @ts-expect-error this will exist
				job: creditMember.job,
				// @ts-expect-error this will exist
				department: creditMember.department,
			},
		}
	}

	if (!person) {
		await prisma.person.create({ data: personData })
	} else {
		await prisma.person.update({
			where: { id: person.id },
			data: {
				casts: personData.casts,
				crews: personData.crews,
			},
		})
	}
}
