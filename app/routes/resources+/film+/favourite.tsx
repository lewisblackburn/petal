import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { useState } from 'react'
import { z } from 'zod'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'

import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { cn } from '#app/utils/misc.tsx'
import { useOptionalUser } from '#app/utils/user.ts'

export const FavouriteFilmSchema = z.object({
	filmId: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()

	const submission = parseWithZod(formData, {
		schema: FavouriteFilmSchema,
	})
	if (submission.status !== 'success') {
		return json(
			{ result: { ...submission.reply(), favourited: false } },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
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

	return json({ result: { ...submission.reply(), favourited: !isFavourited } })
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
	const fetchedfavourited =
		favouriteFetcher.data?.result?.favourited ?? defaultValue ?? false
	const [favourited, setFavourited] = useState(fetchedfavourited)

	const handleClick = () => {
		setFavourited(!favourited)
		favouriteFetcher.submit(
			{ filmId },
			{ method: 'POST', action: '/resources/film/favourite' },
		)
	}

	return (
		<Button variant="secondary" onClick={handleClick} disabled={!user?.id}>
			<Icon
				name="heart-filled"
				className={cn('mr-2', favourited ? 'text-red-500' : '')}
			/>
			<span>Favourite{favourited ? 'd' : ''}</span>
		</Button>
	)
}
