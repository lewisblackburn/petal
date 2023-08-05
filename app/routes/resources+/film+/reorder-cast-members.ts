import { parse } from '@conform-to/zod'
import { type CastMember } from '@prisma/client'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

export const ReorderFilmCastSchema = z.object({
  filmId: z.string(),
  castBefore: z.string(),
  castId: z.string(),
  castAfter: z.string(),
})

export async function action({ request }: DataFunctionArgs) {
  await requireUserId(request)
  const formData = await request.formData()
  const submission = parse(formData, {
    schema: ReorderFilmCastSchema,
    acceptMultipleErrors: () => true,
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

  let { filmId, castBefore, castId, castAfter } = submission.value

  const castBeforeParsed = JSON.parse(castBefore) as CastMember
  const castAfterParsed = JSON.parse(castAfter) as CastMember

  // Calculate the new Numerator and Denominator values
  const numerator =
    (castBeforeParsed?.numerator ?? 0) + (castAfterParsed?.numerator ?? 1)
  const denominator =
    (castBeforeParsed?.denominator ?? 1) + (castAfterParsed?.denominator ?? 0)

  // TODO: at some point the values will need to be reindexed to prevent duplicate order values
  await prisma.castMember
    .update({
      where: { id: castId },
      data: { numerator: numerator, denominator: denominator },
    })
    .catch(err => {
      return redirectWithToast(
        `/films/${filmId}/edit/cast`,
        {
          title: err.message,
          variant: 'destructive',
        },
        { status: 400 },
      )
    })

  return redirectWithToast(`/films/${filmId}/edit/cast`, {
    title: 'Reordered Film Cast Member',
    variant: 'default',
  })
}
