import { Link, useMatches } from '@remix-run/react'
import { Button } from './ui/button'

export type ButtonGroupProps = {
	pages: { name: string; path: string; disabled?: boolean }[]
	fullWidth?: boolean
}

export default function ButtonGroup({ pages }: ButtonGroupProps) {
	const matches = useMatches()

	return (
		<div>
			{pages.map((page, index) => {
				let className = ''

				// TODO: I don't think this is working
				const active = matches.some((match) => {
					if (match.pathname === '/') return page.path === '/'
					const path = match.pathname
					const last = path.lastIndexOf('/')
					const lastPart = path.substring(last + 1)
					return lastPart === page.path
				})

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
					<Link
						key={index}
						to={page.path}
						className={page.disabled ? 'pointer-events-none' : undefined}
					>
						<Button
							variant="outline"
							className={className}
							disabled={page.disabled}
						>
							{page.name}
						</Button>
					</Link>
				)
			})}
		</div>
	)
}
