import { parse } from '@conform-to/zod'
import { faker } from '@faker-js/faker'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

export const AddFilmCreditMemberSchema = z.object({
  filmId: z.string().nonempty(),
  personId: z.string().nonempty({ message: 'You must select a person' }),
  fruit: z.string().nonempty(),
})

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData()
  const submission = parse(formData, {
    schema: AddFilmCreditMemberSchema,
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

  let { filmId, personId } = submission.value

  await prisma.film.update({
    where: { id: filmId },
    data: {
      credits: {
        create: {
          person: {
            connect: {
              id: personId,
            },
          },
          character: faker.person.fullName(),
          department: 'acting',
        },
      },
    },
  })

  return redirectWithToast(`/films/${filmId}/edit`, {
    title: 'Added Film Credit Member',
    variant: 'default',
  })
}
