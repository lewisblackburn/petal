import { Link } from '@remix-run/react'
import Image from './image'

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
			<div className="grid grid-flow-col justify-start gap-5 overflow-x-scroll">
				{items.map((item, index) => (
					<Link key={index} to={item.to} className="w-32">
						<div>
							<Image
								src={item.image}
								fallbackSrc="/img/300x450.png"
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
		</div>
	)
}
