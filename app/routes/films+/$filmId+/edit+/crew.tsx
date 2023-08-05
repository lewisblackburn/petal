import {
  json,
  type DataFunctionArgs,
  type HeadersFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '~/utils/db.server.ts'
import { Container } from '~/components/container.tsx'
import { CrewTable } from '~/components/table/crew/data-table.tsx'
import { requireUserId } from '~/utils/auth.server.ts'
import {
  combineServerTimings,
  makeTimings,
  time,
} from '~/utils/timing.server.ts'
import { columns } from '~/components/table/crew/columns.tsx'

export async function loader({ request, params }: DataFunctionArgs) {
  await requireUserId(request)
  const timings = makeTimings('crew loader')

  const film = await time(
    () =>
      prisma.film.findUnique({
        where: {
          id: params.filmId,
        },
        select: {
          crew: {
            include: {
              person: true,
            },
          },
        },
      }),
    { timings, type: 'find crew' },
  )

  if (!film) {
    throw new Response('Not found', { status: 404 })
  }

  const crew = film.crew.map(crew => ({
    id: crew.id,
    name: crew.person.name,
    department: crew.department,
    job: crew.job,
    featured: crew.featured,
  }))

  return json({ crew }, { headers: { 'Server-Timing': timings.toString() } })
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
  return {
    'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
  }
}

export default function FilmEditCast() {
  const { crew } = useLoaderData<typeof loader>()

  return (
    <Container>
      {/* FIX: Dropdown resetting scroll */}
      <CrewTable data={crew} columns={columns} />
    </Container>
  )
}
