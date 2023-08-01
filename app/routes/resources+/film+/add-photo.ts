import { parse } from '@conform-to/zod'
import {
	json,
	type DataFunctionArgs,
	// unstable_parseMultipartFormData,
	// type UploadHandler,
} from '@remix-run/server-runtime'
// import { composeUploadHandlers } from '@remix-run/server-runtime/dist/formData.js'
// import { createMemoryUploadHandler } from '@remix-run/server-runtime/dist/upload/memoryUploadHandler.js'
import { z } from 'zod'
import { requireUserId } from '~/utils/auth.server.ts'
import { MAX_SIZE } from '~/utils/constants.ts'
import { prisma } from '~/utils/db.server.ts'
import { redirectWithToast } from '~/utils/flash-session.server.ts'
import { ensurePE } from '~/utils/misc.tsx'
// import { s3UploadHandler } from '~/utils/s3.server.ts'
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
	// const uploadHandler: UploadHandler = composeUploadHandlers(
	// 	params =>
	// 		s3UploadHandler({
	// 			...params,
	// 			// TODO: Add randomuuid
	// 			filename: `films/${params.filename}`,
	// 		}),
	// 	createMemoryUploadHandler({ maxPartSize: MAX_SIZE }),
	// )
	// const formData = await unstable_parseMultipartFormData(request, uploadHandler)
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: AddFilmPhotoSchema,
		acceptMultipleErrors: () => true,
	})
	// FIX: Look into if i need to add ensurePE here
	if (!submission.value) {
		return json(
			{
				status: 'error',
				submission,
			} as const,
			{ status: 400 },
		)
	}

	let { filmId, type, primary, language, image } = submission.value

	await prisma.film
		.update({
			where: { id: filmId },
			data: {
				photos: {
					create: {
						type,
						primary,
						language,
						image: image,
					},
				},
			},
		})
		.catch(err => {
			ensurePE(formData, request)
			return redirectWithToast(`/films/${filmId}/edit/photo`, {
				title: err.message,
				variant: 'destructive',
			})
		})

	ensurePE(formData, request)
	return redirectWithToast(`/films/${filmId}/edit/photo`, {
		title: 'Added Film Photo',
		variant: 'default',
	})
}
