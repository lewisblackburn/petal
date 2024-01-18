import { type Prisma } from '@prisma/client'
import { type LoaderFunctionArgs, redirect } from '@remix-run/server-runtime'
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
		_sum: {
			voteCount: true,
		},
	})
	// const TVShowCount here I would compare voteCounts
	const people = await prisma.person.aggregate({
		where: personWhere,
		_count: {
			id: true,
		},
	})

	let redirectTo = '/films'

	// TODO: This will be based on the amount of total votes for the search content
	// e.g. film votes and show votes if lucifer has more votes in shows then go to shows
	// for people I could just implement a views column or just have it as the last else
	// in the if else block. I think that would be the best idea. Maybe if total votes each are
	// below a certain threshold then just go to people.
	if (films._count?.id && films._sum?.voteCount) {
		redirectTo = '/films'
	} else if (people._count?.id) {
		redirectTo = '/people'
	}

	redirectTo = `${redirectTo}?search=${search ?? ''}`

	return redirect(redirectTo)
}
