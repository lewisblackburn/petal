import { type MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import Autoscroll from 'embla-carousel-auto-scroll'
import { useEffect, useState } from 'react'
import { Button } from '#app/components/ui/button.js'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '#app/components/ui/carousel.js'
import { Icon } from '#app/components/ui/icon.js'
export const meta: MetaFunction = () => [{ title: 'Metabase' }]

export default function HomePage() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 100) // Short delay to allow styles to apply correctly
		return () => clearTimeout(timer)
	}, [])

	return (
		<main>
			<div className="bg-secondary">
				<div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
					<Hero />
					<LogoCloud />
				</div>
			</div>
			<Feature />
			<Statistics />
			<FAQ />
		</main>
	)
}

function Hero() {
	return (
		<main className="mx-auto max-w-7xl px-4 py-24 sm:py-32">
			<div className="text-center">
				<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
					<span className="block xl:inline">Linking Worlds</span>{' '}
					<span className="block text-indigo-600 xl:inline">
						Through Stories
					</span>
				</h1>
				<p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
					Discover the connections between films, songs, games, books, and the
					people who bring them to life.
				</p>
				<div className="mx-auto mt-5 flex max-w-md items-center gap-3 sm:flex sm:justify-center md:mt-8">
					<Button
						variant="outline"
						className="flex w-48 items-center justify-center gap-4"
					>
						<Icon name="play" />
						Watch walkthrough
					</Button>

					<Link to="/signup?redirectTo=/dashboard">
						<Button variant="default" className="w-48">
							Start for free
						</Button>
					</Link>
				</div>
			</div>
		</main>
	)
}

const Logos = [
	{
		name: 'TMDB',
		url: 'https://www.themoviedb.org/',
		image: '/images/logos/tmdb.png',
	},
	{
		name: 'Spotify',
		url: 'https://www.spotify.com/',
		image: '/images/logos/spotify.png',
	},
	{
		name: 'Steam',
		url: 'https://store.steampowered.com/',
		image: '/images/logos/steam.png',
	},
	{
		name: 'Goodreads',
		url: 'https://www.goodreads.com/',
		image: '/images/logos/goodreads.png',
	},
	{
		name: 'IMDb',
		url: 'https://www.imdb.com/',
		image: '/images/logos/imdb.png',
	},
]

function LogoCloud() {
	return (
		<div className="bg-secondary">
			<div className="pb-12">
				<Carousel
					opts={{
						align: 'center',
						watchDrag: () => { }, // Disable drag
						loop: true,
					}}
					plugins={[Autoscroll({ startDelay: 0 })]}
				>
					<CarouselContent>
						{[...Logos, ...Logos, ...Logos].map((logo, index) => (
							<CarouselItem
								key={logo.name + index}
								className="flex basis-1/2 items-center justify-center sm:basis-1/3 md:basis-1/5 lg:basis-1/6 xl:basis-2/12 2xl:basis-1/12"
							>
								<a href={logo.url} target="_blank" rel="noopener noreferrer">
									<img
										src={logo.image}
										alt={logo.name}
										className="h-10 grayscale"
										draggable={false}
									/>
								</a>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	)
}

// function LogoCloud() {
// 	return (
// 		<div className="hidden bg-secondary lg:block">
// 			<div className="mx-auto max-w-7xl px-4 pb-32 pt-12 sm:px-6 lg:px-8">
// 				<div className="grid grid-cols-5 gap-8">
// 					{Logos.map((logo) => (
// 						<div
// 							key={logo.name}
// 							className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
// 						>
// 							<a href={logo.url}>
// 								<img
// 									className="h-10 grayscale"
// 									src={logo.image}
// 									alt={logo.name}
// 								/>
// 							</a>
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

function Feature() {
	return (
		<div className="relative overflow-hidden bg-white py-32">
			<div className="relative">
				<div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
					<div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:px-0 lg:py-16">
						<div>
							<div>
								<span className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600">
									<Icon
										name="envelope-closed"
										className="h-6 w-6 text-white"
										aria-hidden="true"
									/>
								</span>
							</div>
							<div className="mt-6">
								<h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
									Stay on top of your favourite media
								</h2>
								<p className="mt-4 text-lg text-gray-500">
									The Metabase database is constantly updated with new
									information about films, soundtracks, games, books, and
									people. You can follow your favorite entries to receive
									notifications when new information is added or updated.
								</p>
								<div className="mt-6">
									<Link
										to="/signup"
										className="inline-flex rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
									>
										Get started
									</Link>
								</div>
							</div>
						</div>
						<div className="mt-8 border-t border-gray-200 pt-6">
							<blockquote>
								<div>
									<p className="text-base text-gray-500">
										&ldquo;I wanted to create a platform where users could
										explore these connections and discover new ways to enjoy
										their favorite films, songs, games, and books.&rdquo;
									</p>
								</div>
								<footer className="mt-3">
									<div className="flex items-center space-x-3">
										<div className="flex-shrink-0">
											<img
												className="h-6 w-6 rounded-full"
												src="/images/lewis.jpg"
												alt=""
											/>
										</div>
										<div className="text-base font-medium text-gray-700">
											Lewis Blackburn, Founder of Metabase
										</div>
									</div>
								</footer>
							</blockquote>
						</div>
					</div>
					<div className="mt-12 sm:mt-16 lg:mt-0">
						<div className="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
							<img
								className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
								src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
								alt="Inbox user interface"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-24">
				<div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
					<div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:px-0 lg:py-32">
						<div>
							<div>
								<span className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600">
									<Icon
										name="camera"
										className="h-6 w-6 text-white"
										aria-hidden="true"
									/>
								</span>
							</div>
							<div className="mt-6">
								<h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
									Manage your media better
								</h2>
								<p className="mt-4 text-lg text-gray-500">
									The dashboard offers all the tools you need to manage your
									favorite media, allowing you to edit and create content while
									keeping you updated with the latest developments.
								</p>
								<div className="mt-6">
									<Link
										to="/signup"
										className="inline-flex rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
									>
										Get started
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
						<div className="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
							<img
								className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
								src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg"
								alt="Customer profile user interface"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function Statistics() {
	return (
		<div className="py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						Largest media database on the web
					</h2>
					<p className="mt-3 text-xl text-gray-500 sm:mt-4">
						The Metabase database is the largest, most comprehensive collection
						of media information on the web.
					</p>
				</div>
			</div>
			<div className="mt-20 bg-white pb-12 sm:pb-16">
				<div className="relative">
					<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-4xl">
							<dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
								<div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
									<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
										Up-Time
									</dt>
									<dd className="order-1 text-5xl font-extrabold text-indigo-600">
										100%
									</dd>
								</div>
								<div className="flex flex-col border-b border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
									<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
										Entries
									</dt>
									<dd className="order-1 text-5xl font-extrabold text-indigo-600">
										1M
									</dd>
								</div>
								<div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
									<dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
										Users
									</dt>
									<dd className="order-1 text-5xl font-extrabold text-indigo-600">
										100k
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const faqs = [
	{
		question: 'What is Metabase?',
		answer:
			'Metabase is a comprehensive database that connects and provides detailed information about films, soundtracks, people (actors, artists), games, and books. You can explore connections between various forms of media and discover how they relate to one another.',
	},
	{
		question: 'How can I contribute to Metabase?',
		answer:
			'You can contribute to Metabase by adding new entries, editing existing entries, and connecting entries to show relationships between them. You can also help by adding missing information, such as cast members, release dates, and more.',
	},
	{
		question: 'How do I get started with Metabase?',
		answer:
			'To get started with Metabase, create an account and start exploring the database. You can search for your favorite films, songs, games, books, and people, and discover how they are connected. You can also contribute by adding new entries or editing existing ones.',
	},
]

function FAQ() {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
				<div className="lg:grid lg:grid-cols-3 lg:gap-8">
					<div>
						<h2 className="text-3xl font-extrabold text-gray-900">
							Frequently asked questions
						</h2>
						<p className="mt-4 text-lg text-gray-500">
							Can’t find the answer you’re looking for? Reach out to our{' '}
							<a
								href="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								customer support
							</a>{' '}
							team.
						</p>
					</div>
					<div className="mt-12 lg:col-span-2 lg:mt-0">
						<dl className="space-y-12">
							{faqs.map((faq) => (
								<div key={faq.question}>
									<dt className="text-lg font-medium leading-6 text-gray-900">
										{faq.question}
									</dt>
									<dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
		</div>
	)
}
