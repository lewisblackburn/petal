import { parseWithZod } from '@conform-to/zod'
import {
	json,
	unstable_parseMultipartFormData,
	type ActionFunctionArgs,
} from '@remix-run/node'
import { z } from 'zod'
import { requireUserId } from '#app/utils/auth.server.ts'
import { MAX_SIZE } from '#app/utils/constants.ts'
import { prisma } from '#app/utils/db.server.ts'
import { extractFileName, withQueryContext } from '#app/utils/misc'
import { s3UploadHandler } from '#app/utils/s3.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddFilmPhotoSchema = z.object({
	filmId: z.string(),
	image: z.instanceof(File, { message: 'Image is required' }).refine(file => {
		return file.size <= MAX_SIZE
	}, 'Image size must be less than 3MB'),
	type: z.enum(['poster', 'backdrop']),
	language: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const clonedRequest = request.clone()
	const formData = await request.formData()

	const submission = parseWithZod(formData, {
		schema: AddFilmPhotoSchema,
	})

	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { filmId, type, language } = submission.value

	const image = await unstable_parseMultipartFormData(clonedRequest, params => {
		return s3UploadHandler({
			...params,
		})
	})

	const parsedImage = parseWithZod(image, { schema: z.any() })

	await prisma.filmPhoto.create(
		withQueryContext(
			{
				data: {
					url: parsedImage.payload.image as string,
					filename: extractFileName(parsedImage.payload.image as string),
					language,
					type,
					film: { connect: { id: filmId } },
				},
			},
			{ userId, modelId: filmId },
		),
	)

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Added Film Photo',
				type: 'success',
			}),
		},
	)
}
