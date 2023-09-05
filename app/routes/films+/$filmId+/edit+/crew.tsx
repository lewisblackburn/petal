import { useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/crew/columns.tsx'
import { CrewTable } from '#app/components/table/film/crew/data-table.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'

export async function loader({ request, params }: DataFunctionArgs) {
  await requireUserId(request)

  const film = await prisma.film.findUnique({
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
  })

  invariantResponse(film, 'Not found', { status: 404 })

  const crew = film.crew.map(crew => ({
    id: crew.id,
    name: crew.person.name,
    department: crew.department,
    job: crew.job,
    featured: crew.featured,
  }))
  return json({ crew })
}

export default function FilmEditCrew() {
  const { crew } = useLoaderData<typeof loader>()

  return (
    <div className="container py-6">
      {/* FIX: Dropdown resetting scroll */}
      <CrewTable data={crew} columns={columns} />
    </div>
  )
}
