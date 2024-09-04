import { faker } from '@faker-js/faker'
import { type Prisma } from '@prisma/client'
import { promiseHash } from 'remix-utils/promise'
import { generateApiKey } from '#app/utils/api.server.js'
import { GENRES, PETAL_BOT_ID } from '#app/utils/constants.js'
import { prisma } from '#app/utils/db.server.ts'
import { MOCK_CODE_GITHUB } from '#app/utils/providers/constants'
import {
	cleanupDb,
	createFilm,
	createPassword,
	createPerson,
	createUser,
	getNoteImages,
	getUserImages,
	img,
} from '#tests/db-utils.ts'
import { insertGitHubUser } from '#tests/mocks/github.ts'

async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	await cleanUpDatabase()

	await createPermissions()

	await createRoles()

	await createUsers()

	await createAdminUser()

	await createBotUser()

	await createGenres()

	await createFilms()

	await createPeople()

	console.timeEnd(`🌱 Database has been seeded`)
}

async function cleanUpDatabase() {
	console.time('🧹 Cleaned up the database...')
	// @ts-expect-error - prisma has the wrong types due to extensions
	await cleanupDb(prisma)
	console.timeEnd('🧹 Cleaned up the database...')
}

async function createPermissions() {
	console.time('🔑 Created permissions...')
	const permissionsToCreate = createPermissionsData()
	await prisma.permission.createMany({ data: permissionsToCreate })
	console.timeEnd('🔑 Created permissions...')
}

function createPermissionsData(): Prisma.PermissionCreateManyInput[] {
	const entities = ['user', 'note', 'film']
	const actions = ['create', 'read', 'update', 'delete']
	const accesses = ['own', 'any'] as const

	return entities.flatMap((entity) =>
		actions.flatMap((action) =>
			accesses.map((access) => ({ entity, action, access })),
		),
	)
}

async function createRoles() {
	console.time('👑 Created roles...')
	await Promise.all([
		createRole('admin', { access: 'any' }),
		createRole('user', { access: 'own' }),
	])
	console.timeEnd('👑 Created roles...')
}

async function createRole(
	name: string,
	permissionFilter: Prisma.PermissionWhereInput,
) {
	const permissions = await prisma.permission.findMany({
		select: { id: true },
		where: permissionFilter,
	})
	await prisma.role.create({
		data: {
			name,
			permissions: {
				connect: permissions.map((permission) => ({ id: permission.id })),
			},
		},
	})
}

async function createUsers() {
	const totalUsers = 5
	console.time(`👤 Created ${totalUsers} users...`)

	const [noteImages, userImages] = await Promise.all([
		getNoteImages(),
		getUserImages(),
	])

	await Promise.all(
		Array.from({ length: totalUsers }).map((_, index) =>
			createUserWithNotes(noteImages, userImages[index % userImages.length]),
		),
	)

	console.timeEnd(`👤 Created ${totalUsers} users...`)
}

async function createUserWithNotes(
	noteImages: Prisma.NoteImageCreateWithoutNoteInput[],
	userImage:
		| { altText: string | undefined; contentType: string; blob: Buffer }
		| undefined,
) {
	const userData = createUser()
	const notesData = createNotesData(noteImages)

	try {
		await prisma.user.create({
			select: { id: true },
			data: {
				...userData,
				password: { create: createPassword(userData.username) },
				image: { create: userImage },
				roles: { connect: { name: 'user' } },
				notes: { create: notesData },
			},
		})
	} catch (e) {
		console.error('Error creating a user:', e)
	}
}

function createNotesData(
	noteImages: Prisma.NoteImageCreateWithoutNoteInput[],
): Prisma.NoteCreateWithoutOwnerInput[] {
	return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
		() => ({
			title: faker.lorem.sentence(),
			content: faker.lorem.paragraphs(),
			images: {
				create: Array.from({
					length: faker.number.int({ min: 1, max: 3 }),
				}).map(() => {
					const imgNumber = faker.number.int({ min: 0, max: 9 })
					const img = noteImages[imgNumber]
					if (!img) {
						throw new Error(`Could not find image #${imgNumber}`)
					}
					return img
				}),
			},
		}),
	)
}

async function createAdminUser() {
	console.time(`🐨 Created admin user "kody"`)

	const kodyImages = await loadKodyImages()
	const githubUser = await insertGitHubUser(MOCK_CODE_GITHUB)

	await prisma.user.create({
		select: { id: true },
		data: {
			email: 'kody@kcd.dev',
			username: 'kody',
			name: 'Kody',
			image: { create: kodyImages.kodyUser },
			password: { create: createPassword('kodylovesyou') },
			connections: {
				create: { providerName: 'github', providerId: githubUser.profile.id },
			},
			roles: { connect: [{ name: 'admin' }, { name: 'user' }] },
			notes: { create: createAdminNotesData(kodyImages) },
		},
	})

	console.timeEnd(`🐨 Created admin user "kody"`)
}

async function loadKodyImages(): Promise<
	Record<string, Prisma.NoteImageCreateWithoutNoteInput>
> {
	return await promiseHash({
		kodyUser: img({ filepath: './tests/fixtures/images/user/kody.png' }),
		cuteKoala: img({
			filepath: './tests/fixtures/images/kody-notes/cute-koala.png',
		}),
		koalaEating: img({
			filepath: './tests/fixtures/images/kody-notes/koala-eating.png',
		}),
		koalaCuddle: img({
			filepath: './tests/fixtures/images/kody-notes/koala-cuddle.png',
		}),
		mountain: img({
			filepath: './tests/fixtures/images/kody-notes/mountain.png',
		}),
		koalaCoder: img({
			filepath: './tests/fixtures/images/kody-notes/koala-coder.png',
		}),
		koalaMentor: img({
			filepath: './tests/fixtures/images/kody-notes/koala-mentor.png',
		}),
		koalaSoccer: img({
			filepath: './tests/fixtures/images/kody-notes/koala-soccer.png',
		}),
	})
}

function createAdminNotesData(
	kodyImages: Record<string, Prisma.NoteImageUncheckedCreateWithoutNoteInput>,
): Prisma.NoteCreateWithoutOwnerInput[] {
	return [
		{
			id: 'd27a197e',
			title: 'Basic Koala Facts',
			content:
				'Koalas are found in the eucalyptus forests of eastern Australia. They have grey fur with a cream-coloured chest, and strong, clawed feet, perfect for living in the branches of trees!',
			images: { create: [kodyImages.cuteKoala!, kodyImages.koalaEating!] },
		},
		{
			id: '414f0c09',
			title: 'Koalas like to cuddle',
			content:
				'Cuddly critters, koalas measure about 60cm to 85cm long, and weigh about 14kg.',
			images: { create: [kodyImages.koalaCuddle!] },
		},
		{
			id: '260366b1',
			title: 'Not bears',
			content:
				"Although you may have heard people call them koala 'bears', these awesome animals aren’t bears at all – they are in fact marsupials. A group of mammals, most marsupials have pouches where their newborns develop.",
		},
		{
			id: 'bb79cf45',
			title: 'Snowboarding Adventure',
			content:
				"Today was an epic day on the slopes! Shredded fresh powder with my friends, caught some sick air, and even attempted a backflip. Can't wait for the next snowy adventure!",
			images: {
				create: [kodyImages.mountain!],
			},
		},
		{
			id: '9f4308be',
			title: 'Onewheel Tricks',
			content:
				"Mastered a new trick on my Onewheel today called '180 Spin'. It's exhilarating to carve through the streets while pulling off these rad moves. Time to level up and learn more!",
		},
		{
			id: '306021fb',
			title: 'Coding Dilemma',
			content:
				"Stuck on a bug in my latest coding project. Need to figure out why my function isn't returning the expected output. Time to dig deep, debug, and conquer this challenge!",
			images: {
				create: [kodyImages.koalaCoder!],
			},
		},
		{
			id: '16d4912a',
			title: 'Coding Mentorship',
			content:
				"Had a fantastic coding mentoring session today with Sarah. Helped her understand the concept of recursion, and she made great progress. It's incredibly fulfilling to help others improve their coding skills.",
			images: {
				create: [kodyImages.koalaMentor!],
			},
		},
		{
			id: '3199199e',
			title: 'Koala Fun Facts',
			content:
				"Did you know that koalas sleep for up to 20 hours a day? It's because their diet of eucalyptus leaves doesn't provide much energy. But when I'm awake, I enjoy munching on leaves, chilling in trees, and being the cuddliest koala around!",
		},
		{
			id: '2030ffd3',
			title: 'Skiing Adventure',
			content:
				'Spent the day hitting the slopes on my skis. The fresh powder made for some incredible runs and breathtaking views. Skiing down the mountain at top speed is an adrenaline rush like no other!',
			images: {
				create: [kodyImages.mountain!],
			},
		},
		{
			id: 'f375a804',
			title: 'Code Jam Success',
			content:
				'Participated in a coding competition today and secured the first place! The adrenaline, the challenging problems, and the satisfaction of finding optimal solutions—it was an amazing experience. Feeling proud and motivated to keep pushing my coding skills further!',
			images: {
				create: [kodyImages.koalaCoder!],
			},
		},
		{
			id: '562c541b',
			title: 'Koala Conservation Efforts',
			content:
				"Joined a local conservation group to protect koalas and their habitats. Together, we're planting more eucalyptus trees, raising awareness about their endangered status, and working towards a sustainable future for these adorable creatures. Every small step counts!",
		},
		// extra long note to test scrolling
		{
			id: 'f67ca40b',
			title: 'Game day',
			content:
				"Just got back from the most amazing game. I've been playing soccer for a long time, but I've not once scored a goal. Well, today all that changed! I finally scored my first ever goal.\n\nI'm in an indoor league, and my team's not the best, but we're pretty good and I have fun, that's all that really matters. Anyway, I found myself at the other end of the field with the ball. It was just me and the goalie. I normally just kick the ball and hope it goes in, but the ball was already rolling toward the goal. The goalie was about to get the ball, so I had to charge. I managed to get possession of the ball just before the goalie got it. I brought it around the goalie and had a perfect shot. I screamed so loud in excitement. After all these years playing, I finally scored a goal!\n\nI know it's not a lot for most folks, but it meant a lot to me. We did end up winning the game by one. It makes me feel great that I had a part to play in that.\n\nIn this team, I'm the captain. I'm constantly cheering my team on. Even after getting injured, I continued to come and watch from the side-lines. I enjoy yelling (encouragingly) at my team mates and helping them be the best they can. I'm definitely not the best player by a long stretch. But I really enjoy the game. It's a great way to get exercise and have good social interactions once a week.\n\nThat said, it can be hard to keep people coming and paying dues and stuff. If people don't show up it can be really hard to find subs. I have a list of people I can text, but sometimes I can't find anyone.\n\nBut yeah, today was awesome. I felt like more than just a player that gets in the way of the opposition, but an actual asset to the team. Really great feeling.\n\nAnyway, I'm rambling at this point and really this is just so we can have a note that's pretty long to test things out. I think it's long enough now... Cheers!",
			images: {
				create: [kodyImages.koalaSoccer!],
			},
		},
	]
}

async function createBotUser() {
	console.time(`🤖 Created bot user "bot"`)

	const kodyImages = await loadKodyImages()
	await prisma.user.create({
		select: { id: true },
		data: {
			id: PETAL_BOT_ID,
			email: 'bot@petal.dev',
			username: 'petal_bot',
			name: 'Petal Bot',
			image: { create: kodyImages.koalaMentor },
			password: {
				create: createPassword(process.env.PETAL_BOT_PASSWORD || ''),
			},
			roles: { connect: [{ name: 'admin' }, { name: 'user' }] },
			apiKeys: { create: { key: await generateApiKey() } },
		},
	})

	console.timeEnd(`🤖 Created bot user "bot"`)
}

async function createGenres() {
	console.time(`🎬 Created ${GENRES.length} genres...`)

	await prisma.filmGenre.createMany({
		data: GENRES.map((genre) => ({ name: genre })),
	})

	console.timeEnd(`🎬 Created ${GENRES.length} genres...`)
}

async function createFilms() {
	const totalFilms = 10
	const films = Array.from({ length: totalFilms }).map(() => createFilm())

	console.time(`🎥 Created ${totalFilms} films...`)
	await prisma.film.createMany({ data: films })
	console.timeEnd(`🎥 Created ${totalFilms} films...`)
}

async function createPeople() {
	const totalPeople = 10
	const people = Array.from({ length: totalPeople }).map(() => createPerson())

	console.time(`👤 Created ${totalPeople} people...`)
	await prisma.person.createMany({ data: people })
	console.timeEnd(`👤 Created ${totalPeople} people...`)
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

// we're ok to import from the test directory in this file
/*
eslint
	no-restricted-imports: "off",
*/
