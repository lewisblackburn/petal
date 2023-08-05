import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'
import { ensurePE } from '~/utils/misc.tsx'
import { checkboxSchema } from '~/utils/zod-extensions.ts'

export const AddFilmCrewMemberSchema = z.object({
  filmId: z.string(),
  personId: z.string().nonempty({ message: 'You must select a person' }),
  department: z.string().nonempty({ message: 'You must select a department' }),
  job: z.string().nonempty({ message: 'You must select a job' }),
  featured: checkboxSchema(),
})

export async function action({ request }: DataFunctionArgs) {
  await requireUserId(request)
  const formData = await request.formData()

  const submission = parse(formData, {
    schema: AddFilmCrewMemberSchema,
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

  let { filmId, personId, department, job, featured } = submission.value

  await prisma.film
    .update({
      where: { id: filmId },
      data: {
        crew: {
          create: {
            person: {
              connect: {
                id: personId,
              },
            },
            department,
            job,
            featured: featured,
          },
        },
      },
    })
    .catch(err => {
      ensurePE(formData, request)
      return redirectWithToast(
        `/films/${filmId}/edit/crew`,
        {
          title: err.message,
          variant: 'destructive',
        },
        { status: 400 },
      )
    })

  ensurePE(formData, request)
  return redirectWithToast(`/films/${filmId}/edit/crew`, {
    title: 'Added Film Crew Member',
    variant: 'default',
  })
}
