import { type Prisma } from '@prisma/client'
import {
  type DataFunctionArgs,
  type HeadersFunction,
  json,
} from '@remix-run/server-runtime'
import { prisma } from '~/utils/db.server.ts'
import { getTableParams } from '~/utils/request.helper.ts'
import {
  combineServerTimings,
  makeTimings,
  time,
} from '~/utils/timing.server.ts'

// NOTE: This will be moved to people index
export async function loader({ request }: DataFunctionArgs) {
  const timings = makeTimings('people loader')
  const { search, take } = getTableParams(request, 5, {
    orderBy: 'createdAt',
    order: 'desc',
  })

  const where = {
    OR: search ? [{ name: { contains: search } }] : undefined,
  } satisfies Prisma.PersonWhereInput

  const people = await time(
    () =>
      prisma.person.findMany({
        take,
        where,
      }),
    { timings, type: 'find people' },
  )

  return json({ people }, { headers: { 'Server-Timing': timings.toString() } })
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
  return {
    'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
  }
}
