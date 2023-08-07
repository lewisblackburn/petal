import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button.js'
import { Icon } from './ui/icon.js'

interface CarouselProps {
	title: string
	description?: string
	items: {
		to: string
		image: string
		title?: string
		subtitle?: string
	}[]
}

export function Carousel({ title, description, items }: CarouselProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [translateX, setTranslateX] = useState(currentImageIndex)
	const [animated, setAnimated] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false) // Track ongoing animations
	// clone the first four images and append them to the end of the array and vice versa
	const clonedItems = [...items, ...items, ...items]

	const itemClassName =
		'flex-[0_0_25%] max-w-[25%] md:flex-[0_0_15%] md:max-w-[15%] lg:flex-[0_0_12.5%] lg:max-w-[12.5%]'

	const prevImage = () => {
		if (!isAnimating) {
			setIsAnimating(true)
			setCurrentImageIndex(prevIndex => prevIndex - 1)
		}
	}

	const nextImage = () => {
		if (!isAnimating) {
			setIsAnimating(true)
			setCurrentImageIndex(prevIndex => prevIndex + 1)
		}
	}

	// Create a ref to the container div
	const imageRef = useRef(null)

	useEffect(() => {
		// + 20 to account for the margin between the images (gap-5 -> 1.25rem -> 20px)
		setTranslateX(
			// @ts-expect-error Property 'offsetWidth' does not exist on type 'never
			-currentImageIndex * (imageRef.current?.offsetWidth + 20 || 0),
		)
	}, [currentImageIndex])

	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-bold">{title}</h2>
					{description && (
						<p className="text-muted-foreground">{description}</p>
					)}
				</div>
				<div>
					<Button onClick={prevImage} size="icon" variant="ghost">
						<Icon name="chevron-left" />
					</Button>
					<Button onClick={nextImage} size="icon" variant="ghost">
						<Icon name="chevron-right" />
					</Button>
				</div>
			</div>
			<div className="relative overflow-hidden">
				<motion.div
					className="flex gap-5"
					animate={{
						transform: `translateX(${translateX}px)`, // Translate the container div based on the currentImageIndex
					}}
					// when last slide is reached, it immediately jumps back to the first actual slide without animation (animation duration set to 0)
					transition={{
						duration: animated ? 0.3 : 0,
					}}
					onAnimationComplete={() => {
						setIsAnimating(false)
						if (currentImageIndex === items.length * 2) {
							setAnimated(false)
							setCurrentImageIndex(items.length)
						} else if (currentImageIndex === 0) {
							setAnimated(false)
							setCurrentImageIndex(items.length)
						} else {
							setAnimated(true)
						}
					}}
				>
					{clonedItems.map((item, index) => (
						<Link
							key={index}
							to={item.to}
							className={itemClassName}
							draggable={false}
						>
							<img
								ref={imageRef}
								src={item.image}
								alt="poster"
								className="aspect-[2/3] rounded-lg object-cover"
								draggable={false}
							/>
						</Link>
					))}
				</motion.div>
			</div>
		</div>
	)
}
