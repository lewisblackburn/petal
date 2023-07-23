import { json, type DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '~/components/error-boundary.tsx'
import { Image } from '~/components/image.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Icon, type IconName } from '~/components/ui/icon.tsx'
import { prisma } from '~/utils/db.server.ts'

export async function loader({ params }: DataFunctionArgs) {
  const film = await prisma.film.findUnique({
    where: {
      id: params.filmId,
    },
    select: {
      id: true,
      title: true,
      overview: true,
      poster: true,
      backdrop: true,
    },
  })
  if (!film) {
    throw new Response('Not found', { status: 404 })
  }
  return json({ film })
}

export default function FilmRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h2 className="text-h2 font-black">About Time</h2>
        <div className="flex items-center gap-5">
          <Button variant="secondary">
            <Icon name="star" className="mr-2" />
            <span>Rate</span>
          </Button>
          <Button variant="secondary">
            <Icon name="heart" className="mr-2" />
            Favourite
          </Button>
          <Button variant="secondary">
            <Icon name="plus" className="mr-2" />
            Add to watchlist
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Image
          src={data.film.poster!}
          alt={data.film.title}
          className="h-[600px] w-[400px]"
        />
        <Image
          src={data.film.backdrop!}
          alt={data.film.title}
          className="h-[600px] w-full"
        />
      </div>
      <div className="grid grid-cols-[3fr_1fr] gap-10">
        <div className="flex flex-col space-y-10">
          <div className="flex items-center justify-between rounded-lg border px-7 py-6">
            <Status title="Runtime" icon="clock">
              2h 5m
            </Status>
            <Status title="Release Date" icon="calendar">
              04/09/2013
            </Status>
            <Status title="Age Rating" icon="person">
              12A
            </Status>
            <Status title="User score" icon="star">
              100%
            </Status>
            <Status title="Language" icon="language">
              English
            </Status>
            <Status title="Status" icon="check">
              {' '}
              Released
            </Status>
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold">Overview</h2>
            <p className="text-base font-normal">
              The night after another unsatisfactory New Year's party, Tim's
              father tells his son that the men in his family have always had
              the ability to travel through time. They can't change history, but
              they can change what happens and has happened in their own lives.
              Thus begins the start of a lesson in learning to appreciate life
              itself as it is, as it comes, and most importantly, the people
              living alongside us.
            </p>
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-lg font-semibold">Richard Curtis</h3>
            <p className="text-base font-normal">Director, Writer</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold">Cast</h2>
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold">Reviews</h2>
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold">Recommendations</h2>
          </div>
        </div>
        <div>
          <div className="flex flex-col space-y-5 rounded-lg border p-5">
            <Button size="lg" className="w-full">
              <Icon name="play" className="mr-2" />
              Play Trailer
            </Button>
            {/* <Divider direction="horizontal" /> */}
            <div className="grid grid-cols-2 gap-5">
              <Status title="Popularity" icon="bar-chart">
                100%
              </Status>
              <Status title="Content Score" icon="folder">
                100%
              </Status>
              <Status title="Budget" icon="banknote">
                $12,000,000.00
              </Status>
              <Status title="Revenue" icon="credit-card">
                $87,100,499.00
              </Status>
            </div>
            {/* <Divider direction="horizontal" /> */}
            <h2 className="text-xl font-bold">Genres</h2>
            {/* <Divider direction="horizontal" /> */}
            <h2 className="text-xl font-bold">Keywords</h2>
            {/* <Divider direction="horizontal" /> */}
            <div className="flex items-center justify-between gap-5">
              <Link to="." className="w-full" preventScrollReset>
                <Button variant="secondary" size="sm" className="w-full">
                  <Icon name="exclamation-triangle" className="mr-1" />
                  Report Issue
                </Button>
              </Link>
              <Link to="edit" className="w-full">
                <Button size="sm" className="w-full">
                  <Icon name="pencil-2" className="mr-2" />
                  Edit Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Status({
  icon,
  title,
  children,
}: React.ComponentPropsWithoutRef<'div'> & {
  title: string
  icon: IconName
}) {
  return (
    <div className="flex flex-col space-y-1">
      <h1 className="font-semibold text-gray-500">{title}</h1>
      <div className="flex items-center space-x-2">
        <Icon name={icon} />
        <p>{children}</p>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <p>Film not found</p>,
      }}
    />
  )
}
