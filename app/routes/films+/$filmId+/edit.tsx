import { Outlet } from '@remix-run/react'
import ButtonGroup from '#app/components/ui/button-group.tsx'

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

export default function FilmEdit() {
	return (
		<div className="container py-6">
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
		</div>
	)
}
