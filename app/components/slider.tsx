interface SliderProps {
	images: string[]
}

export function Slider({ images }: SliderProps) {
	return (
		<div className="grid grid-flow-col justify-start gap-5 overflow-x-scroll">
			{images.map((image, index) => (
				<div key={index} className="w-32">
					<img
						src={image}
						alt={image}
						className="aspect-[2/3] w-full rounded-lg object-cover"
					/>
				</div>
			))}
		</div>
	)
}
