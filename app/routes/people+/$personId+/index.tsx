import { json, type DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Image } from '#app/components/image.tsx'
import { Slider } from '#app/components/slider.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.tsx'

export async function loader({ params }: DataFunctionArgs) {
  const person = await prisma.person.findUnique({
    where: {
      id: params.personId,
    },
    select: {
      id: true,
      name: true,
      placeOfBirth: true,
      photos: {
        take: 1,
        where: {
          primary: true,
        },
      },
      knownForDepartment: true,
      casts: {
        take: 10,
        select: {
          film: {
            select: {
              id: true,
              photos: {
                take: 1,
                where: {
                  primary: true,
                  type: 'poster',
                },
              },
              title: true,
            },
          },
        },
      },
    },
  })

  invariantResponse(person, 'Not found', { status: 404 })

  return json({ person })
}

export default function PersonRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="container grid grid-cols-4 gap-10 py-6">
      <div className="col-span-1 flex flex-col gap-5">
        <Image
          src={data.person.photos[0].image ?? ''}
          alt={data.person.name}
          className="aspect-[2/3]"
        />
        <Link to="edit" className="w-full">
          <Button size="sm" className="w-full">
            <Icon name="pencil-2" className="mr-2" />
            Edit Page
          </Button>
        </Link>
      </div>
      <div className="col-span-3 flex flex-col space-y-5">
        <h1 className="text-3xl font-bold">{data.person.name}</h1>
        <p className="text-base font-normal">
          Rachel Anne McAdams (born November 17, 1978) is a Canadian actress.
          After graduating from a theatre degree program at York University in
          2001, she worked in Canadian television and film productions, such as
          the drama film Perfect Pie (2002), for which she received a Genie
          Award nomination, the comedy film My Name Is Tanino (2002), and the
          comedy series Slings and Arrows (2003–2005), for which she won a
          Gemini Award.
          <br />
          <br />
          In 2002, she made her Hollywood film debut in the comedy The Hot
          Chick. She rose to fame in 2004 with the comedy Mean Girls and the
          romantic drama The Notebook. In 2005, she starred in the romantic
          comedy Wedding Crashers, the psychological thriller Red Eye, and the
          comedy-drama The Family Stone. She was hailed by the media as
          Hollywood's new "it girl", and received a BAFTA Award nomination for
          Best Rising Star.
        </p>
        <p>{data.person.knownForDepartment}</p>
        <p>{data.person.placeOfBirth}</p>
        <div>
          {data.person.casts.length > 0 && (
            <Slider
              title="Known For"
              items={data.person.casts.map(cast => {
                return {
                  to: `/films/${cast.film.id}`,
                  image: cast.film.photos.filter(
                    photo => photo.type === 'poster',
                  )[0].image,
                  title: cast.film.title,
                }
              })}
            />
          )}
        </div>
      </div>
    </div>
  )
}
