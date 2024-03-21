import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '#app/utils/misc.tsx'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

const ratingToReaction = (rating: number) => {
	const reactions = [
		'Dumpster Fire',
		'Absolute Trash',
		'Garbage',
		'Truly Bad',
		'Not Good',
		'Passable',
		"It's Alright",
		'Pretty Decent',
		'Really Good',
		'Greatness',
		'Champion',
	]
	return reactions[rating]
}

const ratingToColour = (rating: number) => {
	const colors = [
		'bg-red-500',
		'bg-red-400',
		'bg-red-300',
		'bg-red-200',
		'bg-red-100',
		'bg-yellow-100',
		'bg-yellow-200',
		'bg-yellow-300',
		'bg-yellow-400',
		'bg-yellow-500',
		'bg-green-500',
	]
	return colors[rating]
}

const RatingSlider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
	const [open, setOpen] = React.useState(false)
	const reaction = ratingToReaction(props.value![0] ?? 0)
	const ratingColour = ratingToColour(props.value![0] ?? 0)

	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				'relative flex w-full touch-none select-none items-center',
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
				<SliderPrimitive.Range
					className={cn('absolute h-full bg-primary', ratingColour)}
				/>
			</SliderPrimitive.Track>
			<TooltipProvider>
				<Tooltip open={open}>
					<TooltipTrigger asChild>
						<SliderPrimitive.Thumb
							onMouseOver={() => setOpen(true)}
							onMouseOut={() => setOpen(false)}
							className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						/>
					</TooltipTrigger>
					<TooltipContent side="top" sideOffset={10}>
						{reaction}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</SliderPrimitive.Root>
	)
})
RatingSlider.displayName = SliderPrimitive.Root.displayName

export { RatingSlider }
