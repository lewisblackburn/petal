import { Link, useMatches } from '@remix-run/react'
import { Button } from './button.tsx'

export default function ButtonGroup({
	pages,
}: {
	pages: { name: string; path: string }[]
}) {
	const matches = useMatches()

	return (
		<div>
			{pages.map((page, index) => {
				let className = ''
				const active = matches.some(match => match.pathname === page.path)
				const last = pages.length - 1

				switch (index) {
					case 0:
						className = 'rounded-r-none border-r-0'
						break
					case 1:
						className = 'rounded-none'
						break
					case last:
						className = 'rounded-l-none border-l-0'
						break
					default:
						className = 'rounded-none border-l-0'
						break
				}

				if (active) className += ' bg-accent'

				return (
					<Link key={index} to={page.path}>
						<Button variant="outline" className={className}>
							{page.name}
						</Button>
					</Link>
				)
			})}
		</div>
	)
}
