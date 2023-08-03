import { parse } from '@conform-to/zod'
import {
	json,
	type DataFunctionArgs,
	unstable_parseMultipartFormData,
} from '@remix-run/server-runtime'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { MAX_SIZE } from '~/utils/constants.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'
import { ensurePE } from '~/utils/misc.tsx'
import { s3UploadHandler } from '~/utils/s3.server.ts'
import { checkboxSchema } from '~/utils/zod-extensions.ts'

// TODO: Change primary variable to order and the primary photo/video will be the first one
export const AddFilmPhotoSchema = z.object({
	filmId: z.string(),
	image:
		typeof window === 'undefined'
			? z.any()
			: z
				.instanceof(File)
				.refine(
					file => file.name !== '' && file.size !== 0,
					'Image is required',
				)
				.refine(file => {
					return file.size <= MAX_SIZE
				}, 'Image size must be less than 3MB'),
	type: z.string().nonempty({ message: 'You must select a type' }),
	language: z.string().nonempty({ message: 'You must select a language' }),
	primary: checkboxSchema(),
})

export async function action({ request }: DataFunctionArgs) {
	await requireUserId(request)
	const clonedRequest = request.clone()
	const formData = await request.formData()

	const submission = parse(formData, {
		schema: AddFilmPhotoSchema,
		acceptMultipleErrors: () => true,
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
			filename: `films/${filmId}/${type}/${language}/${params.filename}`,
		}),
	)

	const parsedImage = parse(image, { schema: z.string() })

	await prisma.film
		.update({
			where: { id: filmId },
			data: {
				photos: {
					create: {
						type,
						primary,
						language,
						image: parsedImage.payload.image,
					},
				},
			},
		})
		.catch(err => {
			ensurePE(formData, request)
			return redirectWithToast(
				`/films/${filmId}/edit/photo`,
				{
					title: err.message,
					variant: 'destructive',
				},
				{ status: 400 },
			)
		})

	ensurePE(formData, request)
	return redirectWithToast(`/films/${filmId}/edit/photo`, {
		title: 'Added Film Photo',
		variant: 'default',
	})
}
