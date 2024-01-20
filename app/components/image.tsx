import { cn } from '#app/utils/misc.tsx'

export function Image({
	fallbackSrc,
	...props
}: React.ComponentPropsWithoutRef<'img'> & {
	fallbackSrc?: string
}) {
	return (
		<img
			{...props}
			onError={({ currentTarget }) => {
				currentTarget.onerror = null // prevents looping
				currentTarget.src = fallbackSrc || ''
			}}
			alt={props.alt}
			className={cn('rounded-lg object-cover', props.className)}
		/>
	)
}
