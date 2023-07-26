import { type ReactNode } from 'react'
import { cn } from '~/utils/misc.tsx'

interface ContainerProps {
	children: ReactNode
	className?: string
}

export function Container({
	children,
	className,
}: ContainerProps): JSX.Element {
	return (
		<div className={cn('mx-auto my-10 w-full max-w-7xl', className)}>
			{children}
		</div>
	)
}
