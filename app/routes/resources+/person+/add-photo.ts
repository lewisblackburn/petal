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
import { extractFileName } from '#app/utils/misc'
import { s3UploadHandler } from '#app/utils/s3.server.ts'
import { createToastHeaders } from '#app/utils/toast.server.ts'

export const AddPersonImageSchema = z.object({
	personId: z.string(),
	image: z.instanceof(File, { message: 'Image is required' }).refine((file) => {
		return file.size <= MAX_SIZE
	}, 'Image size must be less than 3MB'),
})

export async function action({ request }: ActionFunctionArgs) {
	await requireUserId(request)
	const clonedRequest = request.clone()
	const formData = await request.formData()

	const submission = parseWithZod(formData, {
		schema: AddPersonImageSchema,
	})

	if (submission.status !== 'success') {
		return json(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			},
		)
	}

	let { personId } = submission.value

	const image = await unstable_parseMultipartFormData(clonedRequest, (params) =>
		s3UploadHandler({
			...params,
			filename: `people/${personId}/${params.filename}`,
		}),
	)

	//TODO: Fix type
	const parsedImage = parseWithZod(image, { schema: z.any() })

	await prisma.person.update({
		where: { id: personId },
		data: {
			image: parsedImage.payload.image as string,
			photos: {
				create: {
					filename: extractFileName(parsedImage.payload.image as string),
					url: parsedImage.payload.image as string,
					primary: true,
				},
			},
		},
	})

	return json(
		{ result: submission.reply() },
		{
			headers: await createToastHeaders({
				description: 'Added Person Photo',
				type: 'success',
			}),
		},
	)
}
