import type AWS from 'aws-sdk'
import { Upload } from '@aws-sdk/lib-storage'
import { S3 } from '@aws-sdk/client-s3'
import type { UploadHandler } from '@remix-run/node'
import { writeAsyncIterableToWritable } from '@remix-run/node'
import { PassThrough } from 'stream'

const { STORAGE_ACCESS_KEY, STORAGE_SECRET, STORAGE_REGION, STORAGE_BUCKET } =
	process.env

if (
	!(STORAGE_ACCESS_KEY && STORAGE_SECRET && STORAGE_REGION && STORAGE_BUCKET)
) {
	throw new Error(`Storage is missing required configuration.`)
}

const uploadStream = ({ Key }: Pick<AWS.S3.Types.PutObjectRequest, 'Key'>) => {
	const s3 = new S3({
		credentials: {
			accessKeyId: STORAGE_ACCESS_KEY,
			secretAccessKey: STORAGE_SECRET,
		},
		region: STORAGE_REGION,
	})
	const pass = new PassThrough()
	return {
		writeStream: pass,
		promise: new Upload({
			client: s3,
			params: { Bucket: STORAGE_BUCKET, Key, Body: pass },
		}).done(),
	}
}

export async function uploadStreamToS3(data: any, filename: string) {
	const stream = uploadStream({
		Key: filename,
	})
	await writeAsyncIterableToWritable(data, stream.writeStream)
	const file = await stream.promise
	// @ts-expect-error FIX: I need to fix this type
	return file.Location
}

export const s3UploadHandler: UploadHandler = async ({
	name,
	filename,
	data,
}) => {
	if (name !== 'image') {
		return undefined
	}
	const uploadedFileLocation = await uploadStreamToS3(data, filename!)
	return uploadedFileLocation
}
