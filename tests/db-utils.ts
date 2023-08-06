import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { UniqueEnforcer } from 'enforce-unique'

const uniqueUsernameEnforcer = new UniqueEnforcer()

export function createUser() {
	const firstName = faker.person.firstName()
	const lastName = faker.person.lastName()

	const username = uniqueUsernameEnforcer
		.enforce(() => {
			return (
				faker.string.alphanumeric({ length: 5 }) +
				' ' +
				faker.internet.userName({
					firstName: firstName.toLowerCase(),
					lastName: lastName.toLowerCase(),
				})
			)
		})
		.slice(0, 20)
		.toLowerCase()
		.replace(/[^a-z0-9_]/g, '_')
	return {
		username,
		name: `${firstName} ${lastName}`,
		email: `${username}@example.com`,
	}
}

export function createPassword(username: string = faker.internet.userName()) {
	return {
		hash: bcrypt.hashSync(username, 10),
	}
}

export function createFilm() {
	const title = faker.word.noun()
	const overview = faker.lorem.paragraph()

	return {
		title,
		overview,
		photos: {
			create: [
				{
					type: 'poster',
					image: 'https://via.placeholder.com/300x450',
					primary: true,
					language: 'english',
				},
				{
					type: 'backdrop',
					image: 'https://via.placeholder.com/1920x1080',
					primary: true,
					language: 'english',
				},
			],
		},
	}
}

export function createPerson() {
	const name = faker.person.fullName()

	return {
		name,
	}
}

export function createGenre() {
	const name = faker.word.adjective()

	return {
		name,
	}
}

export function createKeyword() {
	const name = faker.word.noun()

	return {
		name,
	}
}
