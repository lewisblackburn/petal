import { parseWithZod } from '@conform-to/zod'
import { type FilmCastMember } from '@prisma/client'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { withQueryContext } from '#app/utils/misc.js'
import { redirectWithToast } from '#app/utils/toast.server.ts'

// TODO: Write tests for adding 10 people, ordering 10 people and then deleteing 10 people

export const ReorderFilmCastSchema = z.object({
	filmId: z.string(),
	castMemberBefore: z.string(),
	castMemberId: z.string(),
	castMemberAfter: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: ReorderFilmCastSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { filmId, castMemberBefore, castMemberId, castMemberAfter } =
		submission.value

	const castMemberBeforeParsed = JSON.parse(castMemberBefore) as FilmCastMember
	const castMemberAfterParsed = JSON.parse(castMemberAfter) as FilmCastMember

	// Calculate the new Numerator and Denominator values
	const numerator =
		(castMemberBeforeParsed?.numerator ?? 0) +
		(castMemberAfterParsed?.numerator ?? 1)
	const denominator =
		(castMemberBeforeParsed?.denominator ?? 1) +
		(castMemberAfterParsed?.denominator ?? 0)

	// TODO: At some point the values will need to be reindexed to prevent duplicate order values
	await prisma.filmCastMember.update(
		withQueryContext(
			{
				where: { id: castMemberId },
				data: { numerator: numerator, denominator: denominator },
			},
			{ userId, modelId: filmId },
		),
	)

	return redirectWithToast(`/films/${filmId}/edit/cast`, {
		description: 'Cast Member Reordered',
	})
}
