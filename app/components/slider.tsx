import { Link } from '@remix-run/react'

interface SliderProps {
	title?: string
	items: {
		to: string
		image: string
	}[]
}

export function Slider({ title, items }: SliderProps) {
	return (
		<div className="flex flex-col gap-5">
			{title && <h2 className="text-xl font-bold">{title}</h2>}
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
		</div>
	)
}
