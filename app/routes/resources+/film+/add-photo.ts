import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs } from '@remix-run/node'
import {
	json,
	unstable_parseMultipartFormData,
} from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { MAX_SIZE } from '#app/utils/constants.ts'
import { prisma } from '#app/utils/db.server.ts'
import { extractFileName } from '#app/utils/misc'
import { s3UploadHandler } from '#app/utils/s3.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmPhotoSchema = z.object({
	filmId: z.string(),
	image: z.instanceof(File, { message: 'Image is required' }).refine(file => {
		return file.size <= MAX_SIZE
	}, 'Image size must be less than 3MB'),
	type: z.enum(['poster', 'backdrop']),
	language: z.string(),
	primary: z.boolean().optional(),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const clonedRequest = request.clone()
	const formData = await request.formData()

	const submission = parse(formData, {
		schema: AddFilmPhotoSchema,
	})

	if (!submission.value) {
		return json(
			{
				status: 'error',
				submission,
			} as const,
			{ status: 400 },
		)
	}

	let { filmId, type, language, primary } = submission.value

	const image = await unstable_parseMultipartFormData(clonedRequest, params => {
		return s3UploadHandler({
			...params,
		})
	})

	const parsedImage = parse(image, { schema: z.any() })

	if (primary) {
		const existingPrimaryPhotoOfSameType = await prisma.filmPhoto.findFirst({
			where: { filmId, primary: true, type },
		})

		if (existingPrimaryPhotoOfSameType && primary) {
			await prisma.$transaction(async $prisma => {
				await $prisma.filmPhoto.update({
					where: { id: existingPrimaryPhotoOfSameType.id },
					data: { primary: false },
				})

				await $prisma.film.update({
					where: { id: filmId },
					data: {
						[type]: parsedImage.payload.image as string,
						photos: {
							create: {
								type,
								language,
								filename: extractFileName(parsedImage.payload.image as string),
								url: parsedImage.payload.image as string,
								primary,
							},
						},
					},
				})
			})
		}
	} else {
		await prisma.film.update({
			where: { id: filmId },
			data: {
				poster: null,
				photos: {
					create: {
						type,
						language,
						filename: extractFileName(parsedImage.payload.image as string),
						url: parsedImage.payload.image as string,
						primary,
					},
				},
			},
		})
	}

	return json({ status: 'success', submission } as const, {
		headers: await createToastHeaders({
			description: 'Added Film Photo',
			type: 'success',
		}),
	})
}

export { action as AddFilmPhotoAction }
