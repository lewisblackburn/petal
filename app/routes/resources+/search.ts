import { type Prisma } from '@prisma/client'
import { type LoaderFunctionArgs, redirect } from '@remix-run/node'
import { prisma } from '#app/utils/db.server'
import { getTableParams } from '#app/utils/request.helper'

export async function loader({ request }: LoaderFunctionArgs) {
	// NOTE: TAKE is set to 0 as it does nothing here.
	const { search } = getTableParams(request, 0, {
		orderBy: 'createdAt',
		order: 'desc',
	})

	const filmWhere = {
		OR: search
			? [
					{ title: { contains: search } },
					{ tagline: { contains: search } },
					{ overview: { contains: search } },
				]
			: undefined,
	} satisfies Prisma.FilmWhereInput
	const personWhere = {
		OR: search
			? [
					{ name: { contains: search } },
					{ biography: { contains: search } },
					{ knownForDepartment: { contains: search } },
				]
			: undefined,
	} satisfies Prisma.PersonWhereInput

	const films = await prisma.film.aggregate({
		where: filmWhere,
		_count: {
			id: true,
		},
		_max: {
			viewCount: true,
		},
	})
	// const TVShowCount here I would compare voteCounts
	const people = await prisma.person.aggregate({
		where: personWhere,
		_count: {
			id: true,
		},
		_max: {
			viewCount: true,
		},
	})

	let redirectTo = '/films'

	const highestValue = Math.max(
		films._max.viewCount ?? 0,
		people._max.viewCount ?? 0,
	)

	if (highestValue === films._max.viewCount) redirectTo = '/films'
	else if (highestValue === people._max.viewCount) redirectTo = '/people'
	// else if (highestValue === 0) redirectTo = '/tv-shows'
	else redirectTo = '/films'

	redirectTo = `${redirectTo}?search=${search ?? ''}`

	return redirect(redirectTo)
}
