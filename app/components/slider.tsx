import { Link } from '@remix-run/react'
import Image from './image'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

interface SliderProps {
	title?: string
	items?: {
		to: string
		image: string
		title?: string
		description?: string
	}[]
}

export function Slider({ title, items }: SliderProps) {
	if (!items) return null
	return (
		<div className="flex flex-col gap-5">
			{title && <h2 className="text-xl font-bold">{title}</h2>}
			<ScrollArea className="">
				<div className="flex w-max space-x-4">
					{items.map((item, index) => (
						<Link key={index} to={item.to} className="w-32">
							<div>
								<Image
									src={item.image}
									fallbackSrc="/images/placeholder/300x450.png"
									alt={item.image}
									className="aspect-[2/3] w-full rounded-lg object-cover"
								/>
								<div className="text-md flex flex-col py-2">
									<span className="font-bold">{item?.title}</span>
									<span>{item?.description}</span>
								</div>
							</div>
						</Link>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	)
}
