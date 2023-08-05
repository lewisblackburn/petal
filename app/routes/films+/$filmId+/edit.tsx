import { json, type DataFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { Container } from '~/components/container.tsx'
import ButtonGroup from '~/components/ui/button-group.tsx'
import { authenticator, requireUserId } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'

export async function loader({ request }: DataFunctionArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			username: true,
		},
	})
	if (!user) {
		throw await authenticator.logout(request, { redirectTo: '/' })
	}
	return json({})
}

const NavigationLinks: { name: string; path: string }[] = [
	{ name: 'Primary Facts', path: '' },
	{ name: 'Alternative Titles', path: 'alternative' },
	{ name: 'Cast', path: 'cast' },
	{ name: 'Crew', path: 'crew' },
	{ name: 'Soundtrack', path: 'soundtrack' },
	{ name: 'External IDs', path: 'external' },
	{ name: 'Genres', path: 'genres' },
	{ name: 'Keywords', path: 'keywords' },
	{ name: 'Production Info', path: 'production' },
	{ name: 'Release Info', path: 'release' },
	{ name: 'Taglines', path: 'taglines' },
	{ name: 'Video', path: 'video' },
	{ name: 'Photo', path: 'photo' },
]

export default function FilmEditLayout() {
	return (
		<Container>
			<div className="mb-5">
				<h2 className="text-2xl font-bold tracking-tight">Edit Film</h2>
				<p className="text-muted-foreground">Edit the details of this film.</p>
			</div>
			<div className="mb-16">
				<ButtonGroup pages={NavigationLinks} />
			</div>
			<main>
				<Outlet />
			</main>
		</Container>
	)
}
