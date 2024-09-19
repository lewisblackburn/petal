import { useForm, getFormProps } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import {
	type ActionFunctionArgs,
	json,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import {
	Form,
	Link,
	useActionData,
	useLoaderData,
	type MetaFunction,
} from '@remix-run/react'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.js'
import { ErrorList } from '#app/components/form/ErrorList.js'
import Image from '#app/components/image.js'
import { Slider } from '#app/components/slider.js'
import Status from '#app/components/status.js'
import { Badge } from '#app/components/ui/badge.js'
import { Button } from '#app/components/ui/button.js'
import { Icon } from '#app/components/ui/icon.js'
import { Separator } from '#app/components/ui/separator.js'
import { StatusButton } from '#app/components/ui/status-button.js'
import { ToggleFavouriteFilm } from '#app/routes/resources+/film+/favourite.js'
import { FilmRatingDropdown } from '#app/routes/resources+/film+/rate.js'
import { getUserId } from '#app/utils/auth.server.js'
import { STATUSES } from '#app/utils/constants.js'
import { prisma } from '#app/utils/db.server.js'
import {
	orderByRationalProperty,
	useDoubleCheck,
	useIsPending,
} from '#app/utils/misc.js'
import {
	requireUserWithPermission,
	requireUserWithRole,
} from '#app/utils/permissions.server.js'
import { redirectWithToast } from '#app/utils/toast.server.js'
import { useOptionalUser, userHasPermission } from '#app/utils/user.js'
import { type IconName } from '@/icon-name'

export async function loader({ request, params }: LoaderFunctionArgs) {
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
			formattedRuntime: true,
			formattedReleaseDate: true,
			ageRating: true,
			voteAverage: true,
			viewCount: true,
			language: true,
			status: true,
			genres: true,
			keywords: true,
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
				select: {
					id: true,
					title: true,
					content: true,
					createdAt: true,
					user: {
						select: {
							name: true,
							username: true,
							initials: true,
							image: true,
						},
					},
					rating: {
						select: {
							value: true,
						},
					},
				},
			},
		},
	})

	invariantResponse(film, 'Not found', { status: 404 })

	return json({
		film: {
			...film,
			cast: orderByRationalProperty(film.cast),
		},
	})
}

const DeleteFormSchema = z.object({
	intent: z.literal('delete-film'),
	filmId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserWithRole(request, 'admin')
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: DeleteFormSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	const { filmId } = submission.value

	const film = await prisma.film.findFirst({
		select: { id: true },
		where: { id: filmId },
	})
	invariantResponse(film, 'Not found', { status: 404 })

	await requireUserWithPermission(request, 'delete:film:any')

	await prisma.film.delete({ where: { id: film.id } })

	return redirectWithToast('/dashboard/films', {
		type: 'success',
		title: 'Success',
		description: 'The film has been deleted.',
	})
}

export function DeleteFilm({ id }: { id: string }) {
	const actionData = useActionData<typeof action>()
	const isPending = useIsPending()
	const [form] = useForm({
		id: 'delete-film',
		lastResult: actionData?.result,
		constraint: getZodConstraint(DeleteFormSchema),
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: DeleteFormSchema })
		},
	})
	const dc = useDoubleCheck()

	return (
		<Form method="post" {...getFormProps(form)}>
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
				status={isPending ? 'pending' : (form.status ?? 'idle')}
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

export default function FilmRoute() {
	const data = useLoaderData<typeof loader>()
	const user = useOptionalUser()
	const canDelete = userHasPermission(user, 'delete:film:any')

	return (
		<div className="flex flex-col gap-10">
			<div className="flex items-center justify-between">
				<h2 className="text-h2 font-black">{data.film.title}</h2>
				<div className="flex items-center gap-5">
					{/* TODO: Fix nested button error  */}
					<FilmRatingDropdown
						filmId={data.film.id}
						defaultRating={data.film.ratings[0]?.value ?? 0}
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
					src={data.film.poster!}
					alt={data.film.title}
					className="h-[600px] w-[400px]"
					fallbackSrc="/images/placeholder/300x450.png"
				/>
				<div>
					<Image
						src={data.film.backdrop ?? ''}
						alt={data.film.title}
						className="aspect-[13.7/9] h-[600px] w-full"
						fallbackSrc="/images/placeholder/1920x1080.png"
					/>
				</div>
			</div>
			<div className="grid grid-cols-10 gap-10">
				<div className="col-span-7 flex flex-col space-y-10">
					<div className="flex items-center justify-between rounded-lg border px-7 py-6">
						<Status title="Runtime" icon="clock">
							{data.film.formattedRuntime ?? 'N/A'}
						</Status>
						<Status title="Release Date" icon="calendar">
							{data.film.formattedReleaseDate ?? 'N/A'}
						</Status>
						<Status title="Age Rating" icon="person">
							{data.film.ageRating ?? 'N/A'}
						</Status>
						<Status title="User score" icon="star">
							{data.film.voteAverage ?? 'N/A'}
						</Status>
						<Status title="Language" icon="languages">
							{data.film.language ?? 'N/A'}
						</Status>
						<Status
							title="Status"
							icon={
								(STATUSES.find((status) => status.name === data.film.status)
									?.icon as IconName) ?? 'question-mark'
							}
						>
							{data.film.status ?? 'N/A'}
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
						{data.film.crew.map((crewMember) => (
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
								.map((castMember) => {
									return {
										to: `/dashboard/people/${castMember.person.id}`,
										image: castMember.person.image ?? '',
										title: castMember.person.name ?? '',
										description: castMember.character ?? '',
									}
								})
								.filter(Boolean)}
						/>
					</div>
					<div className="flex flex-col space-y-5">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold">Reviews</h2>
							<Link to="reviews" className="text-muted-foreground">
								View More
							</Link>
						</div>
						{/* {data.film.reviews.length > 0 ? (
							<ReviewCard filmId={data.film.id} review={data.film.reviews[0]} />
						) : (
							<p className="text-base font-normal text-muted-foreground">
								There are currently no reviews.
							</p>
						)} */}
					</div>
					{/* <div className="flex flex-col space-y-5">
						<h2 className="text-xl font-bold">Recommendations</h2>
						{data.film.recommendations.length > 0 ? (
							<ul className="grid grid-cols-5 gap-5">
								{data.film.recommendations.map((recommendation) => (
									<li key={recommendation.film.id}>
										<Link to={`/films/${recommendation.film.id}`}>
											<Image
												src={recommendation.film.poster!}
												fallbackSrc={'/images/placeholder/300x450.png'}
												alt={recommendation.film.title}
												className="aspect-[2/3] h-full w-full rounded-lg bg-muted"
											/>
											{recommendation.formattedSimilarity}
										</Link>
									</li>
								))}
							</ul>
						) : (
							<p className="text-base font-normal text-muted-foreground">
								There are currently no recommendations.
							</p>
						)}
					</div> */}
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
							<Status title="Views" icon="bar-chart">
								{data.film.viewCount}
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
							{data.film.genres.map((genre) => (
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
							{data.film.keywords.map((keyword) => (
								<Badge
									key={keyword.name}
									className="rounded-md p-2"
									variant="secondary"
								>
									{keyword.name}
								</Badge>
							))}
						</div>
						<Separator />
						<div className="flex flex-col items-center justify-between gap-5">
							{user && (
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
							)}

							<div className="flex w-full items-center justify-between gap-5">
								<Link to="edits" className="w-full">
									<Button variant="secondary" size="sm" className="w-full">
										<Icon name="file-text" className="mr-1" />
										Edit Logs
									</Button>
								</Link>
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
		</div>
	)
}

export const meta: MetaFunction<
	typeof loader,
	{ 'routes/films+/$filmId+': typeof loader }
> = ({ data }) => {
	const filmTitle = data?.film.title ?? 'Film'
	const filmTagline =
		data?.film.tagline && data.film.tagline.length > 100
			? data?.film.tagline.slice(0, 97) + '...'
			: 'No content'
	return [
		{ title: `${filmTitle} | Metabase` },
		{
			name: 'description',
			content: filmTagline,
		},
	]
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
