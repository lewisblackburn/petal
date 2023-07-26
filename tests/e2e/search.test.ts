import { invariant } from '~/utils/misc.tsx'
import { expect, insertNewFilm, test } from '../playwright-utils.ts'

test('Search from home page', async ({ page }) => {
	const searchTerm = 'a'

	const newFilm = await insertNewFilm({
		title: searchTerm,
	})
	invariant(newFilm.title, 'Film must have a title')
	await page.goto('/')

	await page.getByRole('searchbox', { name: /search/i }).fill(searchTerm)
	await page.getByRole('searchbox', { name: /search/i }).press('Enter')

	await page.waitForURL(`/films?search=${searchTerm}`)

	// Wait for the films to load
	await page.waitForLoadState('networkidle')

	// Check if the films are visible
	const films = await page.$$eval('main ul li', elements =>
		elements.map(el => el.textContent?.trim()),
	)

	expect(films.length).toBeGreaterThan(0)
})

test("Search for a title that definitely won't be a result", async ({
	page,
}) => {
	const searchTerm = 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'
	await page.goto('/')

	await page.getByRole('searchbox', { name: /search/i }).fill(searchTerm)
	await page.getByRole('searchbox', { name: /search/i }).press('Enter')

	await page.waitForURL(`/films?search=${searchTerm}`)

	// Wait for the films to load
	await page.waitForLoadState('networkidle')

	// Check if the films are visible
	const films = await page.$$eval('main ul li', elements =>
		elements.map(el => el.textContent?.trim()),
	)

	expect(films.length).toBe(0)
})
