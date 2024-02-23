import path from 'path'
import { PassThrough } from 'stream'
import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import {
	type UploadHandler,
	writeAsyncIterableToWritable,
} from '@remix-run/node'
import type AWS from 'aws-sdk'
import { uuidv4 } from './misc'

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

	const fileType = path.extname(filename!).toLowerCase() // Extract file type
	const newFilename = uuidv4() + fileType

	const uploadedFileLocation = await uploadStreamToS3(data, newFilename)
	return uploadedFileLocation
}

const deleteFromS3 = async (keys: string[]) => {
	const s3 = new S3({
		credentials: {
			accessKeyId: STORAGE_ACCESS_KEY,
			secretAccessKey: STORAGE_SECRET,
		},
		region: STORAGE_REGION,
	})

	const deletePromises = keys.map(async key => {
		const params = {
			Bucket: STORAGE_BUCKET,
			Key: key,
		}

		try {
			await s3.deleteObject(params)
			console.log(`Successfully deleted ${key} from S3.`)
		} catch (error) {
			console.error(`Error deleting ${key} from S3:`, error)
			throw error
		}
	})

	await Promise.all(deletePromises)
}

export const s3DeleteHandler = async (filenames: string[]) => {
	try {
		await deleteFromS3(filenames)
		return `Successfully deleted ${filenames.length} files from S3.`
	} catch (error) {
		return `Error deleting files from S3: ${error}`
	}
}
