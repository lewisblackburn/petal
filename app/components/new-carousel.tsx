import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from './ui/carousel'
import { Icon } from './ui/icon'
import { Link } from '@remix-run/react'

interface NewCarouselProps {
	title: string
	description?: string
	items: {
		to: string
		image: string
		title?: string
	}[]
}

export function NewCarousel({ title, description, items }: NewCarouselProps) {
	const [api, setApi] = useState<CarouselApi>()
	const [count, setCount] = useState(0)
	const [current, setCurrent] = useState(0)

	const previous = () => {
		api?.scrollPrev()
	}

	const next = () => {
		api?.scrollNext()
	}

	useEffect(() => {
		if (!api) {
			return
		}

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])

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
					<Button onClick={previous} size="icon" variant="ghost">
						<Icon name="chevron-left" />
					</Button>
					<Button onClick={next} size="icon" variant="ghost">
						<Icon name="chevron-right" />
					</Button>
				</div>
			</div>
			<Carousel
				opts={{
					align: 'start',
				}}
				setApi={setApi}
				className="w-full"
			>
				<CarouselContent>
					{items.map((item, index) => (
						<CarouselItem
							key={index}
							className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
						>
							<Link key={index} to={item.to} draggable={false}>
								<img
									src={item.image}
									onError={({ currentTarget }) => {
										currentTarget.onerror = null // prevents looping
										currentTarget.src = '/img/300x450.png'
									}}
									alt="poster"
									className="aspect-[2/3] rounded-lg object-cover"
									draggable={false}
								/>
							</Link>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
