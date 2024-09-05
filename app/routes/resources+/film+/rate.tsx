import { parseWithZod } from '@conform-to/zod'
import { json, type ActionFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { useState } from 'react'
import { z } from 'zod'
import { RatingSlider } from '#app/components/rating-slider'
import { Button } from '#app/components/ui/button.tsx'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '#app/components/ui/dialog.js'
import { Icon } from '#app/components/ui/icon.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { cn, useDebounce } from '#app/utils/misc.tsx'
import { useOptionalUser } from '#app/utils/user.ts'

export const RateFilmSchema = z.object({
	filmId: z.string(),
	rating: z.number(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()

	const submission = parseWithZod(formData, {
		schema: RateFilmSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: { ...submission.reply(), rating: 0 } },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
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

	return json({ result: { ...submission.reply(), rating } })
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
	const fetchedRating = ratingFetcher.data?.result.rating ?? defaultRating ?? 0
	const [rating, setRating] = useState(fetchedRating)
	const isRated = rating > 0
	const [value, setValue] = useState<number[]>([rating])
	const [open, setOpen] = useState<boolean>(false)

	const handleSetRating = (value: number) => {
		setRating(value)
		ratingFetcher.submit(
			{ filmId, rating: value },
			{ method: 'POST', action: '/resources/film/rate' },
		)
	}

	const debouncedHandleSetRating = useDebounce(handleSetRating, 500)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger disabled={!user?.id}>
				<Button variant="secondary" type="button" disabled={!user?.id}>
					<Icon
						name="star-filled"
						className={cn('mr-2', isRated ? 'text-yellow-500' : '')}
					/>
					<span>Rate{isRated ? 'd' : ''}</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Rating</DialogTitle>
					<DialogDescription>
						How did you feel about {'film'}?
					</DialogDescription>
				</DialogHeader>
				<RatingSlider
					step={1}
					max={10}
					value={value}
					onValueChange={(value: number[]) => {
						setValue(value)
						debouncedHandleSetRating(value[0]!)
					}}
				/>
				<DialogFooter>
					<Button type="submit" onClick={() => setOpen(false)}>
						I'm Done
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
