import { parse } from '@conform-to/zod'
import { type DataFunctionArgs, json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { redirectWithToast } from '~/utils/flash-session.server.ts'

export const AddActorSchema = z.object({
  personId: z.string().nonempty(),
  fruit: z.string().nonempty(),
})

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData()
  const submission = parse(formData, {
    schema: AddActorSchema,
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

  const filmId = '1'

  return redirectWithToast(`/films/${filmId}/edit`, {
    title: 'Added Actor',
    variant: 'default',
  })
}
