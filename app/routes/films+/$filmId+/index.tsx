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
import { orderByRationalProperty } from '~/utils/misc.tsx'
import {
	combineServerTimings,
	makeTimings,
	time,
} from '~/utils/timing.server.ts'

export async function loader({ params }: DataFunctionArgs) {
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
					overview: true,
					poster: true,
					backdrop: true,
					genres: true,
					keywords: true,
					credits: {
						take: 10,
						select: {
							// These needs to be included for ordering
							id: true,
							person: {
								select: {
									name: true,
									image: true,
								},
							},
							character: true,
							numerator: true,
							denominator: true,
						},
					},
				},
			}),
		{ timings, type: 'find film' },
	)

	if (!film) {
		throw new Response('Not found', { status: 404 })
	}

	const credits = orderByRationalProperty(film.credits)

	return json(
		{ film: { ...film, credits } },
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
							Released
						</Status>
					</div>
					<div className="flex flex-col space-y-1">
						<h2 className="text-xl font-bold">Overview</h2>
						<p className="text-base font-normal">{data.film.overview}</p>
					</div>
					{/* TODO: Here will be a list of the crew who a featured */}
					<div className="flex flex-col space-y-1">
						<h3 className="text-lg font-semibold">Richard Curtis</h3>
						<p className="text-base font-normal">Director, Writer</p>
					</div>
					{/* TODO: Toggleable infinite scroll mode */}
					<Slider
						title="Cast"
						items={data.film.credits.map(credit => {
							return {
								to: `/people/${credit.id}`,
								image: credit.person.image!,
								title: credit.person.name,
								subtitle: credit.character,
							}
						})}
					/>
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
