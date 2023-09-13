import { useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { columns } from '#app/components/table/film/genres/columns.tsx'
import { GenreTable } from '#app/components/table/film/genres/data-table.tsx'
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
      genres: true,
    },
  })

  invariantResponse(film, 'Not found', { status: 404 })

  const genres = film.genres.map(genre => ({
    id: genre.id,
    name: genre.name,
    created: new Date(genre.createdAt),
    updated: new Date(genre.updatedAt),
  }))

  return json({ genres })
}

export default function FilmEditGenresRoute() {
  const { genres } = useLoaderData<typeof loader>()

  return (
    <div className="container py-6">
      {/* FIX: Dropdown resetting scroll */}
      <GenreTable data={genres} columns={columns} />
    </div>
  )
}
