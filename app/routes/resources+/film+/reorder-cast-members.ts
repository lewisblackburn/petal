import { parse } from '@conform-to/zod'
import { type CastMember } from '@prisma/client'
import { type ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'

// TODO: Write tests for adding 10 people, ordering 10 people and then deleteing 10 people

export const ReorderFilmCastSchema = z.object({
	filmId: z.string(),
	castMemberBefore: z.string(),
	castMemberId: z.string(),
	castMemberAfter: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: ReorderFilmCastSchema,
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

	let { filmId, castMemberBefore, castMemberId, castMemberAfter } =
		submission.value

	const castMemberBeforeParsed = JSON.parse(castMemberBefore) as CastMember
	const castMemberAfterParsed = JSON.parse(castMemberAfter) as CastMember

	// Calculate the new Numerator and Denominator values
	const numerator =
		(castMemberBeforeParsed?.numerator ?? 0) +
		(castMemberAfterParsed?.numerator ?? 1)
	const denominator =
		(castMemberBeforeParsed?.denominator ?? 1) +
		(castMemberAfterParsed?.denominator ?? 0)

	// TODO: At some point the values will need to be reindexed to prevent duplicate order values
	await prisma.castMember.update({
		where: { id: castMemberId },
		data: { numerator: numerator, denominator: denominator },
	})

	return redirectWithToast(`/films/${filmId}/edit/cast`, {
		description: 'Cast Member Reordered',
	})
}
export { action as ReorderFilmCastMembersAction }
