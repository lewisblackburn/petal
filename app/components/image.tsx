import React, { useEffect, useRef, useState } from 'react'
import { cn } from '#app/utils/misc.tsx'
import { Skeleton } from './ui/skeleton'

function Image({
	fallbackSrc,
	alt,
	...props
}: React.ComponentPropsWithoutRef<'img'> & {
	fallbackSrc?: string
}) {
	const imgRef = useRef<HTMLImageElement>(null)
	const [imageLoaded, setImageLoaded] = useState(false)

	function onLoad() {
		// console.log('Loaded...')
		setImageLoaded(true)
	}

	const handleImageError = (
		event: React.SyntheticEvent<HTMLImageElement, Event>,
	) => {
		const target = event.currentTarget
		target.onerror = null // Prevents looping
		if (fallbackSrc) {
			target.src = fallbackSrc
		}
	}

	useEffect(() => {
		if (imgRef.current?.complete) {
			onLoad()
		}
	}, [])

	return (
		<>
			{!imageLoaded && (
				<Skeleton className={cn('rounded-lg object-cover', props.className)} />
			)}
			<img
				{...props}
				ref={imgRef}
				onLoad={onLoad}
				onError={handleImageError}
				alt={alt}
				className={cn('rounded-lg object-cover', props.className)}
				style={{ display: imageLoaded ? 'block' : 'none' }}
			/>
		</>
	)
}

export default React.memo(Image)
