import { parse } from '@conform-to/zod'
import { type CreditMember } from '@prisma/client'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

export const ReorderFilmCreditSchema = z.object({
  filmId: z.string(),
  creditBefore: z.string(),
  creditId: z.string(),
  creditAfter: z.string(),
})

export async function action({ request }: DataFunctionArgs) {
  await requireUserId(request)
  const formData = await request.formData()
  const submission = parse(formData, {
    schema: ReorderFilmCreditSchema,
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

  let { filmId, creditBefore, creditId, creditAfter } = submission.value

  const creditBeforeParsed = JSON.parse(creditBefore) as CreditMember
  const creditAfterParsed = JSON.parse(creditAfter) as CreditMember

  // Calculate the new Numerator and Denominator values
  const numerator =
    (creditBeforeParsed?.numerator ?? 0) + (creditAfterParsed?.numerator ?? 1)
  const denominator =
    (creditBeforeParsed?.denominator ?? 1) +
    (creditAfterParsed?.denominator ?? 0)

  // TODO: at some point the values will need to be reindexed to prevent duplicate order values
  await prisma.creditMember
    .update({
      where: { id: creditId },
      data: { numerator: numerator, denominator: denominator },
    })
    .catch(err => {
      return redirectWithToast(
        `/films/${filmId}/edit/credits`,
        {
          title: err.message,
          variant: 'destructive',
        },
        { status: 400 },
      )
    })

  return redirectWithToast(`/films/${filmId}/edit/credits`, {
    title: 'Reordered Film Credit Member',
    variant: 'default',
  })
}
