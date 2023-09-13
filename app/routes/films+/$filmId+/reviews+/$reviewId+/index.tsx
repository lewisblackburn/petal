import { useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { type V2_MetaFunction } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { ErrorList } from '#app/components/forms.tsx'

import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import {
  invariantResponse,
  useDoubleCheck,
  useIsPending,
} from '#app/utils/misc.tsx'
import {
  requireUserWithPermission,
  userHasPermission,
} from '#app/utils/permissions.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'
import { useOptionalUser } from '#app/utils/user.ts'
import { type loader as filmsLoader } from './index.tsx'

export async function loader({ params, request }: DataFunctionArgs) {
  const userId = await requireUserId(request)
  const filmReview = await prisma.filmReview.findUnique({
    where: {
      id: params.reviewId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      userId: true,
      film: {
        select: {
          ratings: {
            where: {
              userId
            }
          }
        }
      }
    },
  })

  invariantResponse(filmReview, 'Not found', { status: 404 })

  return json({
    filmReview,
  })
}

const DeleteFormSchema = z.object({
  intent: z.literal('delete-review'),
  reviewId: z.string(),
})

export async function action({ params, request }: DataFunctionArgs) {
  const userId = await requireUserId(request)
  const formData = await request.formData()
  const submission = parse(formData, {
    schema: DeleteFormSchema,
  })
  if (submission.intent !== 'submit') {
    return json({ status: 'idle', submission } as const)
  }
  if (!submission.value) {
    return json({ status: 'error', submission } as const, { status: 400 })
  }

  const { reviewId } = submission.value

  const filmReview = await prisma.filmReview.findFirst({
    select: { id: true, userId: true },
    where: { id: reviewId },
  })
  invariantResponse(filmReview, 'Not found', { status: 404 })

  const isOwner = filmReview.userId === userId
  await requireUserWithPermission(
    request,
    isOwner ? `delete:review:own` : `delete:review:any`,
  )

  await prisma.filmReview.delete({ where: { id: filmReview.id } })

  return redirectWithToast(`/films/${params.filmId}/reviews`, {
    type: 'success',
    title: 'Success',
    description: 'The film review has been deleted.',
  })
}

export default function FilmReviewRoute() {
  const data = useLoaderData<typeof loader>()
  const user = useOptionalUser()
  const isOwner = user?.id === data.filmReview.userId
  const canDelete = userHasPermission(
    user,
    isOwner ? `delete:review:own` : `delete:review:any`,
  )

  return (
    <div className="container flex flex-col gap-10 py-6">
      {data.filmReview.film.ratings.length > 0 && data.filmReview.film.ratings[0].value}
      <h1>
        {data.filmReview.title}
      </h1>
      <p>
        {data.filmReview.content}
      </p>
      <div className="flex gap-5">
        {canDelete && <DeleteFilmReview id={data.filmReview.id} />}
        <Button
          asChild
          className="min-[525px]:max-md:aspect-square min-[525px]:max-md:px-0"
        >
          <Link to="edit">
            <Icon name="pencil-1" className="scale-125 max-md:scale-150">
              <span className="max-md:hidden">Edit</span>
            </Icon>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export function DeleteFilmReview({ id }: { id: string }) {
  const actionData = useActionData<typeof action>()
  const isPending = useIsPending()
  const [form] = useForm({
    id: 'delete-film-review',
    lastSubmission: actionData?.submission,
    constraint: getFieldsetConstraint(DeleteFormSchema),
    onValidate({ formData }) {
      return parse(formData, { schema: DeleteFormSchema })
    },
  })
  const dc = useDoubleCheck()

  return (
    <Form method="post" {...form.props}>
      <input type="hidden" name="reviewId" value={id} />
      <StatusButton
        type="submit"
        name="intent"
        value="delete-film-review"
        variant={dc.doubleCheck ? 'destructive' : 'default'}
        {...dc.getButtonProps({
          type: 'submit',
          name: 'intent',
          value: 'delete-review',
        })}
        status={isPending ? 'pending' : actionData?.status ?? 'idle'}
        disabled={isPending}
        className="w-full max-md:aspect-square max-md:px-0"
      >
        <Icon name="trash" className="scale-125 max-md:scale-150">
          {dc.doubleCheck ? 'Are you sure?' : 'Delete'}
        </Icon>
      </StatusButton>
      <ErrorList errors={form.errors} id={form.errorId} />
    </Form>
  )
}

export const meta: V2_MetaFunction<
  typeof loader,
  // FIX: This will need to be a reveiws loader
  { 'routes/films+/$filmId+/review/$reviewId': typeof filmsLoader }
> = ({ data }) => {
  const filmReview =
    data?.filmReview.content && data.filmReview.content.length > 100
      ? data?.filmReview.content.slice(0, 97) + '...'
      : 'No content'
  return [
    { title: `Review | Petal` },
    {
      name: 'description',
      content: filmReview,
    },
  ]
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        403: () => <p>You are not allowed to do that</p>,
        404: ({ params }) => (
          <p>No review with the id "{params.reviewId}" exists</p>
        ),
      }}
    />
  )
}
