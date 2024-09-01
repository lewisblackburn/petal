import { Button } from '#app/components/ui/button.js'
import { Icon } from '#app/components/ui/icon.js'
import { type MetaFunction } from '@remix-run/node'
export const meta: MetaFunction = () => [{ title: 'Petal' }]

export default function Index() {
	return (
		<main>
			<Hero />
			<LogoCloud />
			<FAQ />
		</main>
	)
}

function Hero() {
	return (
		<main className="bg-secondary">
			<div className="mx-auto max-w-7xl px-4 py-24 sm:py-32">
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

						<Button variant="default" className="w-48">
							Start for free
						</Button>
					</div>
				</div>
			</div>
		</main>
	)
}

const Logos = [
	// film, song, game, book, people website related lgoo
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
			<div className="mx-auto max-w-7xl px-4 pb-32 pt-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
					{Logos.map((logo) => (
						<div
							key={logo.name}
							className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
						>
							<a href={logo.url}>
								<img
									className="h-10 grayscale"
									src={logo.image}
									alt={logo.name}
								/>
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

const faqs = [
	{
		question: 'What is Petal?',
		answer:
			'Petal is a comprehensive database that connects and provides detailed information about films, soundtracks, people (actors, artists), games, and books. You can explore connections between various forms of media and discover how they relate to one another.',
	},
	{
		question: 'How can I contribute to Petal?',
		answer:
			'You can contribute to Petal by adding new entries, editing existing entries, and connecting entries to show relationships between them. You can also help by adding missing information, such as cast members, release dates, and more.',
	},
	{
		question: 'How do I get started with Petal?',
		answer:
			'To get started with Petal, create an account and start exploring the database. You can search for your favorite films, songs, games, books, and people, and discover how they are connected. You can also contribute by adding new entries or editing existing ones.',
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
