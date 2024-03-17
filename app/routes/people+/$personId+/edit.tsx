import { Outlet } from '@remix-run/react'
import ButtonGroup, { type ButtonGroupProps } from '#app/components/button-group'

const NavigationLinks: ButtonGroupProps['pages'] = [
	{ name: 'Primary Facts', path: '' },
	{ name: 'Alternative Names', path: 'alternative', disabled: true },
	{ name: 'External Links', path: 'links', disabled: true },
	{ name: 'Photo', path: 'photo' },
]

export default function PersonEditLayout() {
	return (
		<div>
			<div className="mb-5">
				<h2 className="text-2xl font-bold tracking-tight">Edit Person</h2>
				<p className="text-muted-foreground">
					Edit the details of this person.
				</p>
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
