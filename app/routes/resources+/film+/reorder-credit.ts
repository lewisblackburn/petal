import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

export const ReorderFilmCreditSchema = z.object({
  filmId: z.string(),
  creditId: z.string(),
  order: z.string(),
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

  let { filmId, creditId, order } = submission.value

  await prisma.film
    .update({
      where: { id: filmId },
      data: {
        credits: {
          update: {
            where: {
              id: creditId,
            },
            data: {
              order: parseInt(order, 10),
            },
          },
        },
      },
    })
    .catch(err => {
      return redirectWithToast(`/films/${filmId}/edit/credits`, {
        title: err.message,
        variant: 'destructive',
      })
    })

  return redirectWithToast(`/films/${filmId}/edit/credits`, {
    title: 'Reordered Film Credit Member',
    variant: 'default',
  })
}
