import { cn } from '#app/utils/misc.js'

export const Field = ({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) => {
	return (
		<div className={cn('flex flex-col gap-2 pb-6', className)}>{children}</div>
	)
}

export const FieldError = ({ children }: { children: React.ReactNode }) => {
	return <div className="text-sm text-red-600 ">{children}</div>
}
