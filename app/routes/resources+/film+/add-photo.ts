import { parse } from '@conform-to/zod'
import {
	json,
	type DataFunctionArgs,
	unstable_parseMultipartFormData,
} from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { MAX_SIZE } from '#app/utils/constants.ts'
import { prisma } from '#app/utils/db.server.ts'
import { s3UploadHandler } from '#app/utils/s3.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmPhotoSchema = z.object({
	filmId: z.string(),
	image: z.instanceof(File, { message: 'Image is required' }).refine(file => {
		return file.size <= MAX_SIZE
	}, 'Image size must be less than 3MB'),
	type: z.string().nonempty({ message: 'You must select a type' }),
	language: z.string().nonempty({ message: 'You must select a language' }),
	primary: z.boolean().optional(),
})

export async function action({ request }: DataFunctionArgs) {
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

	let { filmId, type, primary, language } = submission.value

	const image = await unstable_parseMultipartFormData(clonedRequest, params =>
		s3UploadHandler({
			...params,
			filename: `films/${filmId}/${language}/${params.filename}`,
		}),
	)

	//TODO: Fix type
	const parsedImage = parse(image, { schema: z.any() })

	// check if a primary photo of that type already exists
	if (primary) {
		const primaryPhoto = await prisma.film.findFirst({
			where: {
				id: filmId,
			},
			select: {
				photos: {
					where: {
						type,
						primary: true,
					},
				},
			},
		})

		if (primaryPhoto?.photos.length) {
			return json(
				{ success: false },
				{
					headers: await createToastHeaders({
						description: 'A primary photo of that type already exists',
						type: 'error',
					}),
				},
			)
		}
	}

	await prisma.film.update({
		where: { id: filmId },
		data: {
			photos: {
				create: {
					type,
					// TODO: Just make this requried
					primary: primary ?? false,
					language,
					image: parsedImage.payload.image,
				},
			},
		},
	})

	return json(
		{ success: true },
		{
			headers: await createToastHeaders({
				description: 'Added Film Photo',
				type: 'success',
			}),
		},
	)
}
