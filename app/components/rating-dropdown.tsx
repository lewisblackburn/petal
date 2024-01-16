import { useState } from 'react'
import { Button } from './ui/button.tsx'
import { Icon } from './ui/icon.tsx'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover.tsx'

interface RatingDropdownProps {
	defaultValue?: number
}

export function RatingDropdown({ defaultValue }: RatingDropdownProps) {
	const [open, setOpen] = useState(false)
	// Use state to track the currently hovered star
	const [hoveredStar, setHoveredStar] = useState<number | 0>(defaultValue ?? 0)
	const [selectedRating, setSelectedRating] = useState<number | 0>(0)

	// Function to handle rating selection
	const handleRatingClick = (rating: number) => {
		if (selectedRating === rating) {
			// If the same rating is clicked again, deselect it
			setSelectedRating(0)
		} else {
			setSelectedRating(rating)
		}
	}

	return (
		<>
			<input name="rating" type="hidden" value={selectedRating} />
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger>
					<Button variant="secondary" type="button">
						<Icon name="star" className="mr-2" />
						<span>Rate</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full">
					<div
						className="flex items-center justify-between gap-2"
						onMouseLeave={() => setHoveredStar(0)} // Reset hoveredStar when leaving the rating area
					>
						{[...Array(5)].map((_, i) => (
							<Icon
								key={i}
								name="star-filled"
								size="md"
								className={`${
									i < hoveredStar ||
									(selectedRating !== null && i < selectedRating)
										? 'transition-color text-yellow-500 duration-150 ease-in-out'
										: 'transition-color text-gray-500 duration-150 ease-in-out'
								} cursor-pointer hover:text-yellow-500`}
								onMouseEnter={() => setHoveredStar(i + 1)}
								onClick={() => {
									handleRatingClick(i + 1)
									setOpen(false)
								}}
							/>
						))}
					</div>
				</PopoverContent>
			</Popover>
		</>
	)
}
