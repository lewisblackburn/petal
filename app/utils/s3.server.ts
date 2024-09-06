import path from 'path'
import { PassThrough } from 'stream'
import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import {
	type UploadHandler,
	writeAsyncIterableToWritable,
} from '@remix-run/node'
import { v4 as uuidv4 } from 'uuid'

const { STORAGE_ACCESS_KEY, STORAGE_SECRET, STORAGE_REGION, STORAGE_BUCKET } =
	process.env

interface UploadStreamOptions {
	Key: string
}

const createS3Client = () =>
	new S3({
		credentials: {
			accessKeyId: STORAGE_ACCESS_KEY!,
			secretAccessKey: STORAGE_SECRET!,
		},
		region: STORAGE_REGION!,
	})

const uploadStream = ({ Key }: UploadStreamOptions) => {
	const s3 = createS3Client()
	const pass = new PassThrough()

	return {
		writeStream: pass,
		promise: new Upload({
			client: s3,
			params: { Bucket: STORAGE_BUCKET!, Key, Body: pass },
		}).done(),
	}
}

export async function uploadStreamToS3(
	data: AsyncIterable<Uint8Array>,
	filename: string,
	folder?: string,
) {
	const key = folder ? `${folder}/${filename}` : filename
	const stream = uploadStream({ Key: key })
	await writeAsyncIterableToWritable(data, stream.writeStream)
	const file = await stream.promise
	return file.Location
}

export const createUploadHandler =
	(folder: string = 'images'): UploadHandler =>
	async ({ data, filename, name }) => {
		if (name !== 'image') return undefined

		const fileType = path.extname(filename!).toLowerCase()
		const newFilename = `${uuidv4()}${fileType}`
		return await uploadStreamToS3(data, newFilename, folder)
	}

const deleteFromS3 = async (keys: string[]) => {
	const s3 = createS3Client()

	await Promise.all(
		keys.map(async (key) => {
			try {
				await s3.deleteObject({ Bucket: STORAGE_BUCKET!, Key: key })
			} catch (error) {
				console.error(`Error deleting ${key} from S3:`, error)
				throw error
			}
		}),
	)
}

const deleteFolderFromS3 = async (prefix: string = '') => {
	const s3 = createS3Client()

	try {
		const listedObjects = await s3.listObjectsV2({
			Bucket: STORAGE_BUCKET!,
			Prefix: prefix,
		})

		if (listedObjects.Contents?.length) {
			const keys = listedObjects.Contents.map((object) => object.Key!)
			while (keys.length) {
				const batch = keys.splice(0, 1000)
				await s3.deleteObjects({
					Bucket: STORAGE_BUCKET!,
					Delete: { Objects: batch.map((key) => ({ Key: key })) },
				})
			}
		}
	} catch (error) {
		console.error(
			`Error deleting objects with prefix ${prefix} from S3:`,
			error,
		)
		throw error
	}
}

export const s3DeleteHandler = async (
	filenames: string[],
	isFolder: boolean = false,
) => {
	try {
		if (isFolder && filenames.length > 0) {
			const prefix = filenames[0]
			await deleteFolderFromS3(prefix)
			return `Successfully deleted folder with prefix ${prefix} from S3.`
		}
		await deleteFromS3(filenames)
		return `Successfully deleted ${filenames.length} files from S3.`
	} catch (error) {
		return `Error deleting files or folder from S3: ${error}`
	}
}
