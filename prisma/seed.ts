import fs from 'fs'
import { faker } from '@faker-js/faker'
import {
	createFilm,
	createPassword,
	createPerson,
	createUser,
} from 'tests/db-utils.ts'
import { prisma } from '~/utils/db.server.ts'
import { deleteAllData } from 'tests/setup/utils.ts'
import { getPasswordHash } from '~/utils/auth.server.ts'

async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')
	deleteAllData()
	console.timeEnd('🧹 Cleaned up the database...')

	console.time(`👑 Created admin role/permission...`)
	const adminRole = await prisma.role.create({
		data: {
			name: 'admin',
			permissions: {
				create: { name: 'admin' },
			},
		},
	})
	console.timeEnd(`👑 Created admin role/permission...`)
	const totalUsers = 40
	console.time(`👤 Created ${totalUsers} users...`)
	const users = await Promise.all(
		Array.from({ length: totalUsers }, async (_, index) => {
			const userData = createUser()
			const userCreatedUpdated = getCreatedAndUpdated()
			const user = await prisma.user
				.create({
					select: { id: true },
					data: {
						...userData,
						...userCreatedUpdated,
						password: {
							create: createPassword(userData.username),
						},
						image: {
							create: {
								contentType: 'image/jpeg',
								file: {
									create: {
										blob: await fs.promises.readFile(
											`./tests/fixtures/images/user/${index % 10}.jpg`,
										),
									},
								},
							},
						},
						notes: {
							create: Array.from({
								length: faker.number.int({ min: 0, max: 10 }),
							}).map(() => ({
								title: faker.lorem.sentence(),
								content: faker.lorem.paragraphs(),
								...getCreatedAndUpdated(userCreatedUpdated.createdAt),
							})),
						},
					},
				})
				.catch(() => null)
			return user
		}),
	).then(users => users.filter(Boolean))
	console.timeEnd(`👤 Created ${users.length} users...`)

	const totalFilms = 40
	console.time(`🎞️ Created ${totalFilms} films...`)
	const films = await Promise.all(
		Array.from({ length: totalFilms }, async () => {
			const filmData = createFilm()
			const filmCreatedUpdated = getCreatedAndUpdated()
			const film = await prisma.film
				.create({
					select: { id: true },
					data: {
						...filmData,
						...filmCreatedUpdated,
					},
				})
				.catch(() => null)
			return film
		}),
	).then(films => films.filter(Boolean))
	console.timeEnd(`🎞️ Created ${films.length} films...`)

	const totalPeople = 40
	console.time(`🎞️ Created ${totalFilms} films...`)
	const people = await Promise.all(
		Array.from({ length: totalPeople }, async () => {
			const personData = createPerson()
			const personCreatedUpdated = getCreatedAndUpdated()
			const person = await prisma.person
				.create({
					select: { id: true },
					data: {
						...personData,
						...personCreatedUpdated,
					},
				})
				.catch(() => null)
			return person
		}),
	).then(films => films.filter(Boolean))
	console.timeEnd(`🧍 Created ${people.length} people...`)

	console.time(
		`🐨 Created user "kody" with the password "kodylovesyou" and admin role`,
	)
	await prisma.user.create({
		data: {
			email: 'kody@kcd.dev',
			username: 'kody',
			name: 'Kody',
			roles: { connect: { id: adminRole.id } },
			image: {
				create: {
					contentType: 'image/png',
					file: {
						create: {
							blob: await fs.promises.readFile(
								'./tests/fixtures/images/user/kody.png',
							),
						},
					},
				},
			},
			password: {
				create: {
					hash: await getPasswordHash('kodylovesyou'),
				},
			},
			notes: {
				create: [
					{
						title: 'Basic Koala Facts',
						content:
							'Koalas are found in the eucalyptus forests of eastern Australia. They have grey fur with a cream-coloured chest, and strong, clawed feet, perfect for living in the branches of trees!',
					},
					{
						title: 'Koalas like to cuddle',
						content:
							'Cuddly critters, koalas measure about 60cm to 85cm long, and weigh about 14kg.',
					},
					{
						title: 'Not bears',
						content:
							"Although you may have heard people call them koala 'bears', these awesome animals aren’t bears at all – they are in fact marsupials. A group of mammals, most marsupials have pouches where their newborns develop.",
					},
				],
			},
		},
	})
	console.timeEnd(
		`🐨 Created user "kody" with the password "kodylovesyou" and admin role`,
	)

	console.timeEnd(`🌱 Database has been seeded`)
}

function getCreatedAndUpdated(from: Date = new Date(2020, 0, 1)) {
	const createdAt = faker.date.between({ from, to: new Date() })
	const updatedAt = faker.date.between({ from: createdAt, to: new Date() })
	return { createdAt, updatedAt }
}

seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

/*
eslint
	@typescript-eslint/no-unused-vars: "off",
*/
