import { useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { type V2_MetaFunction } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/server-runtime'
import { format } from 'date-fns'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { ErrorList } from '#app/components/forms.tsx'
import { Image } from '#app/components/image.tsx'
import { Slider } from '#app/components/slider.tsx'
import { Badge } from '#app/components/ui/badge.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { Separator } from '#app/components/ui/separator.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { ToggleFavouriteFilm } from '#app/routes/resources+/film+/favourite.tsx'
import { FilmRatingDropdown } from '#app/routes/resources+/film+/rate.tsx'
import { getUserId } from '#app/utils/auth.server.ts'
import { LANGUAGES, STATUSES } from '#app/utils/constants.ts'
import { prisma } from '#app/utils/db.server.ts'
import {
	invariantResponse,
	useDoubleCheck,
	useIsPending,
	formatRuntime,
	orderByRationalProperty,
} from '#app/utils/misc.tsx'
import {
	requireUserWithPermission,
	requireUserWithRole,
	userHasPermission,
} from '#app/utils/permissions.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'
import { useOptionalUser } from '#app/utils/user.ts'
import { type IconName } from '@/icon-name'
import { type loader as filmsLoader } from './index.tsx'

export async function loader({ request, params }: DataFunctionArgs) {
	const userId = await getUserId(request)
	const film = await prisma.film.findUnique({
		where: {
			id: params.filmId,
		},
		select: {
			id: true,
			title: true,
			tagline: true,
			overview: true,
			runtime: true,
			releaseDate: true,
			ageRating: true,
			userScore: true,
			language: true,
			status: true,
			genres: true,
			keywords: true,
			popularity: true,
			contentScore: true,
			budget: true,
			revenue: true,
			poster: true,
			backdrop: true,
			trailer: true,
			cast: {
				take: 10,
				select: {
					id: true,
					person: {
						select: {
							id: true,
							name: true,
							image: true,
						},
					},
					character: true,
					// These needs to be included for cast ordering
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
			favourited: {
				take: 1,
				where: {
					userId: userId ?? '',
				},
			},
			ratings: {
				take: 1,
				where: {
					userId: userId ?? '',
				},
			},
			reviews: {
				take: 1,
				orderBy: { createdAt: 'desc' },
			},
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	const releaseDate = format(new Date(film.releaseDate ?? ''), 'dd MMMM yyyy')
	const runtime = formatRuntime(film.runtime ?? 0)

	return json({
		film: {
			...film,
			cast: orderByRationalProperty(film.cast),
			releaseDate,
			runtime,
		},
	})
}

const DeleteFormSchema = z.object({
	intent: z.literal('delete-film'),
	filmId: z.string(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserWithRole(request, 'admin')
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

	const { filmId } = submission.value

	const film = await prisma.film.findFirst({
		select: { id: true },
		where: { id: filmId },
	})
	invariantResponse(film, 'Not found', { status: 404 })

	await requireUserWithPermission(request, 'delete:film:any')

	await prisma.film.delete({ where: { id: film.id } })

	return redirectWithToast('/films', {
		type: 'success',
		title: 'Success',
		description: 'The film has been deleted.',
	})
}

export default function FilmRoute() {
	const data = useLoaderData<typeof loader>()
	const user = useOptionalUser()
	const canDelete = userHasPermission(user, 'delete:film:any')

	return (
		<div className="container flex flex-col gap-10 py-6">
			<div className="flex items-center justify-between">
				<h2 className="text-h2 font-black">{data.film.title}</h2>
				<div className="flex items-center gap-5">
					{/* FIX: Fix nested button error  */}
					<FilmRatingDropdown
						filmId={data.film.id}
						defaultRating={data.film.ratings[0]?.value}
					/>
					<ToggleFavouriteFilm
						filmId={data.film.id}
						defaultValue={!!data.film.favourited[0]?.id}
					/>
					<Button variant="secondary">
						<Icon name="plus" className="mr-2" />
						Add to watchlist
					</Button>
				</div>
			</div>
			<div className="flex items-center gap-5">
				<Image
					src={data.film.poster ?? ''}
					alt={data.film.title}
					className="h-[600px] w-[400px]"
				/>
				<Image
					src={data.film.backdrop ?? ''}
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
							{data.film.ageRating ?? 'N/A'}
						</Status>
						<Status title="User score" icon="star">
							{data.film.userScore ?? 'N/A'}
						</Status>
						<Status title="Language" icon="language">
							{LANGUAGES.find(language => language.value === data.film.language)
								?.label ?? 'N/A'}
						</Status>
						{data.film.status && (
							<Status
								title="Status"
								icon={
									(STATUSES.find(status => status.value === data.film.status)
										?.icon as IconName) ?? 'question-mark'
								}
							>
								{STATUSES.find(status => status.value === data.film.status)
									?.label ?? 'N/A'}
							</Status>
						)}
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
										image: castMember.person.image ?? '',
										title: castMember.person.name ?? '',
										description: castMember.character ?? '',
									}
								})
								.filter(Boolean)}
						/>
					</div>
					<div className="flex flex-col space-y-1">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold">Reviews</h2>
							<Link to="reviews" className="text-muted-foreground">
								View More
							</Link>
						</div>
						{data.film.reviews.length > 0 ? (
							<div>{data.film.reviews[0].content}</div>
						) : (
							<p className="text-base font-normal text-muted-foreground">
								There are currently no reviews.
							</p>
						)}
					</div>
					<div className="flex flex-col space-y-1">
						<h2 className="text-xl font-bold">Recommendations</h2>
					</div>
				</div>
				<div className="col-span-3">
					<div className="flex flex-col space-y-5 rounded-lg border p-5">
						<a
							href={data.film.trailer ?? ''}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button
								size="lg"
								className="w-full"
								disabled={!data.film.trailer}
							>
								<Icon name="play" className="mr-2" />
								Play Trailer
							</Button>
						</a>
						<Separator />
						<div className="grid grid-cols-2 gap-5">
							<Status title="Popularity" icon="bar-chart">
								{data.film.popularity ?? 'N/A'} %
							</Status>
							<Status title="Content Score" icon="folder">
								{data.film.contentScore ?? 'N/A'} %
							</Status>
							<Status title="Budget" icon="banknote">
								$ {data.film.budget ?? 'N/A'}
							</Status>
							<Status title="Revenue" icon="credit-card">
								$ {data.film.revenue ?? 'N/A'}
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
						<div className="flex flex-col items-center justify-between gap-5">
							<div className="flex w-full items-center justify-between gap-5">
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
							{canDelete && (
								<div className="w-full">
									<DeleteFilm id={data.film.id} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export function DeleteFilm({ id }: { id: string }) {
	const actionData = useActionData<typeof action>()
	const isPending = useIsPending()
	const [form] = useForm({
		id: 'delete-film',
		lastSubmission: actionData?.submission,
		constraint: getFieldsetConstraint(DeleteFormSchema),
		onValidate({ formData }) {
			return parse(formData, { schema: DeleteFormSchema })
		},
	})
	const dc = useDoubleCheck()

	return (
		<Form method="post" {...form.props}>
			<input type="hidden" name="filmId" value={id} />
			<StatusButton
				type="submit"
				name="intent"
				value="delete-film"
				variant={dc.doubleCheck ? 'destructive' : 'default'}
				{...dc.getButtonProps({
					type: 'submit',
					name: 'intent',
					value: 'delete-film',
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
	{ 'routes/films+/$filmId+': typeof filmsLoader }
> = ({ data }) => {
	const filmTitle = data?.film.title ?? 'Film'
	const filmTagline =
		data?.film.tagline && data.film.tagline.length > 100
			? data?.film.tagline.slice(0, 97) + '...'
			: 'No content'
	return [
		{ title: `${filmTitle} | Petal` },
		{
			name: 'description',
			content: filmTagline,
		},
	]
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
				403: () => <p>You are not allowed to do that</p>,
				404: ({ params }) => (
					<p>No film with the id "{params.filmId}" exists</p>
				),
			}}
		/>
	)
}
