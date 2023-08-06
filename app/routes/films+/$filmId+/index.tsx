import {
	json,
	type DataFunctionArgs,
	type HeadersFunction,
} from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Container } from '~/components/container.tsx'
import { Image } from '~/components/image.tsx'
import { Slider } from '~/components/slider.tsx'
import { Badge } from '~/components/ui/badge.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Icon, type IconName } from '~/components/ui/icon.tsx'
import { Separator } from '~/components/ui/separator.tsx'
import { prisma } from '~/utils/db.server.ts'
import {
	getDateTimeFormat,
	invariantResponse,
	minutesToWatchTime,
	orderByRationalProperty,
} from '~/utils/misc.tsx'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'

export async function loader({ request, params }: DataFunctionArgs) {
	invariantResponse(params.filmId, 'Missing filmId')
	const timings = makeTimings('film loader')

	const film = await time(
		() =>
			prisma.film.findUnique({
				where: {
					id: params.filmId,
				},
				select: {
					id: true,
					title: true,
					tagline: true,
					overview: true,
					photos: {
						take: 2,
						where: {
							primary: true,
						},
					},
					videos: {
						take: 1,
						where: {
							primary: true,
							type: 'trailer',
						},
					},
					runtime: true,
					releaseDate: true,
					genres: true,
					keywords: true,
					cast: {
						take: 10,
						select: {
							id: true,
							person: {
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
							},
							character: true,
							// These needs to be included for ordering
							numerator: true,
							denominator: true,
						},
					},
					crew: {
						where: {
							featured: true,
						},
						select: {
							id: true,
							job: true,
							person: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			}),
		{ timings, type: 'find film' },
	)

	if (!film) {
		throw new Response('Not found', { status: 404 })
	}

	const releaseDate = new Date(film.releaseDate ?? 0)
	const cast = orderByRationalProperty(film.cast)

	return json(
		{
			film: {
				...film,
				runtime: minutesToWatchTime(film.runtime ?? 0),
				releaseDate: getDateTimeFormat(request).format(releaseDate),
				cast,
				crew: mergeCrewMembers(film.crew),
			},
		},
		{ headers: { 'Server-Timing': timings.toString() } },
	)
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
	return {
		'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders),
	}
}

export default function FilmRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<Container className="flex flex-col gap-10">
			<div className="flex items-center justify-between">
				<h2 className="text-h2 font-black">{data.film.title}</h2>
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
					src={
						data.film.photos.filter(photo => photo.type === 'poster')[0]?.image
					}
					alt={data.film.title}
					className="h-[600px] w-[400px]"
				/>
				<Image
					src={
						data.film.photos?.filter(photo => photo.type === 'backdrop')[0]
							?.image
					}
					alt={data.film.title}
					className="h-[600px] w-full"
				/>
			</div>
			<div className="grid grid-cols-10 gap-10">
				<div className="col-span-7 flex flex-col space-y-10">
					<div className="flex items-center justify-between rounded-lg border px-7 py-6">
						<Status title="Runtime" icon="clock">
							{data.film.runtime ?? 'N/A'}
						</Status>
						<Status title="Release Date" icon="calendar">
							{data.film.releaseDate ?? 'N/A'}
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
							Released
						</Status>
					</div>
					<div className="flex flex-col space-y-1">
						<h2 className="text-xl font-bold">Overview</h2>
						<p className="pb-3 text-base font-normal text-muted-foreground">
							{data.film.tagline}
						</p>
						<p className="text-base font-normal">{data.film.overview}</p>
					</div>
					<div className="flex gap-10">
						{data.film.crew.map(crewMember => (
							<div key={crewMember.id} className="flex flex-col space-y-1">
								<h3 className="text-md font-semibold">
									{crewMember.person.name}
								</h3>
								<p className="text-sm font-normal capitalize">
									{crewMember.job}
								</p>
							</div>
						))}
					</div>
					<div className="flex flex-col space-y-3">
						<h2 className="text-xl font-bold">Cast</h2>
						<Slider
							items={data.film.cast
								.map(castMember => {
									return {
										to: `/people/${castMember.person.id}`,
										image: castMember.person.photos[0].image,
									}
								})
								.filter(Boolean)}
						/>
					</div>
					<div className="flex flex-col space-y-1">
						<h2 className="text-xl font-bold">Reviews</h2>
					</div>
					<div className="flex flex-col space-y-1">
						<h2 className="text-xl font-bold">Recommendations</h2>
					</div>
				</div>
				<div className="col-span-3">
					<div className="flex flex-col space-y-5 rounded-lg border p-5">
						<a
							href={data.film.videos.filter(Boolean)[0].url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button size="lg" className="w-full">
								<Icon name="play" className="mr-2" />
								Play Trailer
							</Button>
						</a>
						<Separator />
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
						<Separator />
						<h2 className="text-xl font-bold">Genres</h2>
						<Separator />
						<div className="grid grid-cols-2 gap-5">
							{data.film.genres.map(genre => (
								<Badge
									key={genre.id}
									className="rounded-md p-2"
									variant="secondary"
								>
									{genre.name}
								</Badge>
							))}
						</div>
						<h2 className="text-xl font-bold">Keywords</h2>
						<Separator />
						<div className="flex flex-wrap gap-5">
							{data.film.keywords.map(keyword => (
								<Badge
									key={keyword.id}
									className="rounded-md p-2"
									variant="secondary"
								>
									{keyword.name}
								</Badge>
							))}
						</div>
						<Separator />
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
		</Container>
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
function mergeCrewMembers(arr: any[]) {
	const nameMap = new Map()

	// Group crew members with the same name
	arr.forEach(item => {
		const { id, person, job } = item
		const { name } = person

		if (nameMap.has(name)) {
			const existingMember = nameMap.get(name)
			existingMember.job += ', ' + job
		} else {
			nameMap.set(name, { id, person, job })
		}
	})

	// Convert the map values back to an array
	const mergedCrewMembers = Array.from(nameMap.values())

	return mergedCrewMembers
}
