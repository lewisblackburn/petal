import bcrypt from 'bcryptjs'
import { prisma } from './db.server'

export const apiKeyId = 'x-api-key'

function generateRandomString(length: number): string {
	const characters: string =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	let randomString: string = ''

	for (let i = 0; i < length; i++) {
		const randomIndex: number = Math.floor(Math.random() * characters.length)
		randomString += characters.charAt(randomIndex)
	}

	return randomString
}

export async function generateApiKey(): Promise<string> {
	const apiKeyLength: number = 32

	return new Promise<string>((resolve, reject) => {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				reject(err)
			} else {
				bcrypt.hash(
					generateRandomString(apiKeyLength),
					salt,
					(hashErr, hash) => {
						if (hashErr) {
							reject(hashErr)
						} else {
							resolve(hash)
						}
					},
				)
			}
		})
	})
}

export async function validateApiKey(request: Request) {
	const apiKey = request.headers.get(apiKeyId)

	if (!apiKey) return null

	const key = await prisma.apiKey.findUnique({
		where: { key: apiKey },
	})

	if (!key) return null

	return key
}
