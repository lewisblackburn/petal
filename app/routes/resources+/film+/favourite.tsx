import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import {  json } from '@remix-run/server-runtime'
import { z } from 'zod'
import { Spinner } from '#app/components/spinner.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'

import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { cn } from '#app/utils/misc.tsx'
import { createToastHeaders } from '#app/utils/toast.server.ts'
import { useOptionalUser } from '#app/utils/user.ts'

export const FavouriteFilmSchema = z.object({
	filmId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()

	const submission = parse(formData, {
		schema: FavouriteFilmSchema,
	})
	if (!submission.value) {
		return json(
			{
				status: 'error',
				favourited: false,
				submission,
			} as const,
			{ status: 400 },
		)
	}

	let { filmId } = submission.value

	const isFavourited = await prisma.filmFavourite.findFirst({
		where: {
			filmId,
			userId,
		},
	})

	if (isFavourited) {
		await prisma.filmFavourite.delete({
			where: {
				id: isFavourited.id,
			},
		})
	} else {
		await prisma.filmFavourite.create({
			data: {
				filmId,
				userId,
			},
		})
	}

	return json({ status: 'success', favourited: !isFavourited, submission } as const, {
		headers: await createToastHeaders({
				description: isFavourited ? 'Film Unfavourited' : 'Film Favourited',
			type: 'success',
		}),
	})
}

export const ToggleFavouriteFilm = ({
	filmId,
	defaultValue,
}: {
	filmId: string
	defaultValue: boolean
}) => {
	const user = useOptionalUser()
	const favouriteFetcher = useFetcher<typeof action>()
	const favourited = favouriteFetcher.data?.favourited ?? defaultValue ?? false
	const busy = favouriteFetcher.state !== 'idle'

	const handleClick = () => {
		favouriteFetcher.submit(
			{ filmId },
			{ method: 'POST', action: '/resources/film/favourite' },
		)
	}

	return (
		<Button variant="secondary" onClick={handleClick} disabled={!user?.id}>
			{busy ? (
				<div className="relative">
					<Spinner showSpinner />
				</div>
			) : (
				<Icon
					name="heart-filled"
					className={cn('mr-2', favourited ? 'text-red-500' : '')}
				/>
			)}
			Favourite{favourited ? 'd' : ''}
		</Button>
	)
}

export { action as FavouriteFilmAction}