import { parse } from '@conform-to/zod'
import { useFetcher } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import { useState } from 'react'
import { z } from 'zod'
import { Spinner } from '#app/components/spinner.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '#app/components/ui/popover.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { cn } from '#app/utils/misc.tsx'
import { createToastHeaders } from '#app/utils/toast.server.ts'
import { useOptionalUser } from '#app/utils/user.ts'
import {  ActionFunctionArgs } from '@remix-run/node'

export const RateFilmSchema = z.object({
	filmId: z.string(),
	rating: z.number(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()

	const submission = parse(formData, {
		schema: RateFilmSchema,
	})
	if (!submission.value) {
		return json(
			{
				status: 'error',
				rating: 0,
				submission,
			} as const,
			{ status: 400 },
		)
	}

	let { filmId, rating } = submission.value

	if (rating === 0) {
		await prisma.filmRating.delete({
			where: {
				filmId_userId: {
					filmId,
					userId,
				},
			},
		})
	} else {
		await prisma.filmRating.upsert({
			where: {
				filmId_userId: { filmId, userId },
			},
			create: {
				filmId,
				userId,
				value: rating,
			},
			update: {
				value: rating,
			},
		})
	}

	const updatedAverageRating = await prisma.filmRating.aggregate({
		where: { filmId: filmId },
		_avg: { value: true },
	})

	await prisma.film.update({
		where: { id: filmId },
		data: {
			userScore: {
				set: updatedAverageRating._avg.value ?? 0,
			},
		},
	})

	return json({ status: 'success', rating, submission } as const, {
		headers: await createToastHeaders({
				description: 'Film Rated',
			type: 'success',
		}),
	})
}

export const FilmRatingDropdown = ({
	filmId,
	defaultRating,
}: {
	filmId: string
	defaultRating: number
}) => {
	const user = useOptionalUser()
	const ratingFetcher = useFetcher<typeof action>()
	const rating = ratingFetcher.data?.rating ?? defaultRating ?? 0
	const isRated = rating !== 0
	const [open, setOpen] = useState(false)
	const [hoveredRating, setHoveredRating] = useState(rating)

	const handleStarHover = (starRating: number) => {
		setHoveredRating(starRating)
	}

	const handleStarClick = (starRating: number) => {
		ratingFetcher.submit(
			{ filmId, rating: starRating === rating ? 0 : starRating },
			{ method: 'POST', action: '/resources/film/rate' },
		)
		setOpen(false)
		setHoveredRating(0);
	}

	const busy = ratingFetcher.state !== 'idle'

	// Create an array of 5 stars
	const stars = Array.from({ length: 5 }, (_, index) => {
		const starRating = index + 1
		const isFilled =
			starRating <= (hoveredRating !== null ? hoveredRating : rating)

		return (
			<Icon
				key={starRating}
				name={isFilled ? 'star-filled' : 'star'}
				className={`cursor-pointer ${
					isFilled ? 'text-yellow-500' : 'text-gray-500'
				}`}
				onMouseEnter={() => handleStarHover(starRating)}
				onClick={() => handleStarClick(starRating)}
			/>
		)
	})

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger disabled={!user?.id}>
				<Button variant="secondary" type="button" disabled={!user?.id}>
					{busy ? (
						<Spinner showSpinner />
					) : (
						<Icon
							name="star-filled"
							className={cn('mr-2', isRated ? 'text-yellow-500' : '')}
						/>
					)}
					<span>Rate{isRated ? 'd' : ''}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full">
				<div
					className="flex items-center gap-2"
					onMouseLeave={() => {
						if (!busy) {
							handleStarHover(rating)
						}
					}}
				>
					{stars}
				</div>
			</PopoverContent>
		</Popover>
	)
}

export {action as RateFilmAction}