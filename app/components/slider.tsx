import { Link } from '@remix-run/react'

interface SliderProps {
	items: {
		to: string
		image: string
	}[]
}

export function Slider({ items }: SliderProps) {
	return (
		<div className="grid grid-flow-col justify-start gap-5 overflow-x-scroll">
			{items.map((item, index) => (
				<Link key={index} to={item.to} className="w-32">
					<img
						src={item.image}
						alt={item.image}
						className="aspect-[2/3] w-full rounded-lg object-cover"
					/>
				</Link>
			))}
		</div>
	)
}
