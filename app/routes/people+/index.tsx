import { type Prisma } from '@prisma/client'
import {
  json,
  type DataFunctionArgs,
  type V2_MetaFunction,
} from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { InfiniteScroll } from '#app/components/infinite-scroll.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { getTableParams } from '#app/utils/request.helper.ts'

const TAKE = 20

export async function loader({ request }: DataFunctionArgs) {
  const { orderBy, search, skip, take } = getTableParams(request, TAKE, {
    orderBy: 'createdAt',
    order: 'desc',
  })
  const where = {
    OR: search ? [{ name: { contains: search } }] : undefined,
  } satisfies Prisma.PersonWhereInput

  const people = await prisma.person.findMany({
    orderBy,
    skip,
    take,
    where,
    select: {
      id: true,
      name: true,
      photos: {
        take: 1,
        where: {
          primary: true,
        },
      },
    },
  })

  const count = await prisma.person.count({
    where,
  })

  return json({ people, count })
}

export default function PeopleRoute() {
  const data = useLoaderData<typeof loader>()
  const location = useLocation()
  const combined = [...(location.state?.data ?? []), ...data.people]

  return (
    <main className="container py-6">
      <Outlet />
      <ul className="grid grid-cols-4 gap-5">
        {combined.map(person => (
          <li key={person.id}>
            <Link to={person.id}>
              <img
                src={person.photos[0]?.image}
                alt={person.name}
                className="aspect-[2/3] h-full w-full rounded-lg bg-muted"
              />
            </Link>
          </li>
        ))}
      </ul>
      <InfiniteScroll take={TAKE} count={data.count} data={combined} />
    </main>
  )
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'People | Petal' },
    {
      name: 'description',
      content: `People on Petal`,
    },
  ]
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />
}
