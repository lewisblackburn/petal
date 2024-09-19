// Footer.tsx
import { Form, Link } from '@remix-run/react'
import { type SVGProps } from 'react'
import { Icon } from './ui/icon'
import { Input } from './ui/input'
import { Label } from './ui/label'

// Define the navigation types
type NavigationItem = {
	name: string
	href: string
	icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

type Navigation = {
	aboutus: NavigationItem[]
	services: NavigationItem[]
	support: NavigationItem[]
	misc: NavigationItem[]
	social: NavigationItem[]
}

const navigation: Navigation = {
	aboutus: [
		{ name: 'Our Story', href: '#' },
		{ name: 'Team', href: '#' },
		{ name: 'Careers', href: '#' },
		{ name: 'Contact Us', href: '#' },
	],
	services: [
		{ name: 'API', href: '#' },
		{ name: 'Pricing', href: '#' },
		{ name: 'Documentation', href: '#' },
		{ name: 'Integrations', href: '#' },
	],
	support: [
		{ name: 'FAQ', href: '#' },
		{ name: 'Help Center', href: '#' },
		{ name: 'Terms of Service', href: '#' },
		{ name: 'Privacy Policy', href: '#' },
	],
	misc: [
		{ name: 'Blog', href: '#' },
		{ name: 'Status', href: '#' },
		{ name: 'Security', href: '#' },
		{ name: 'Sitemap', href: '#' },
	],
	social: [
		{
			name: 'Facebook',
			href: '#',
			icon: (props: SVGProps<SVGSVGElement>) => (
				<Icon {...props} name="facebook" />
			),
		},
		{
			name: 'Instagram',
			href: '#',
			icon: (props: SVGProps<SVGSVGElement>) => (
				<Icon {...props} name="instagram" />
			),
		},
		{
			name: 'Twitter',
			href: '#',
			icon: (props: SVGProps<SVGSVGElement>) => (
				<Icon {...props} name="twitter" />
			),
		},
		{
			name: 'GitHub',
			href: '#',
			icon: (props: SVGProps<SVGSVGElement>) => (
				<Icon {...props} name="github" />
			),
		},
		{
			name: 'Dribbble',
			href: '#',
			icon: (props: SVGProps<SVGSVGElement>) => (
				<Icon {...props} name="dribbble" />
			),
		},
	],
}

export default function Footer() {
	return (
		<footer className="bg-white" aria-labelledby="footer-heading">
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="grid grid-cols-2 gap-8 xl:col-span-2">
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
									About Us
								</h3>
								<ul role="list" className="mt-4 space-y-4">
									{navigation.aboutus.map((item) => (
										<li key={item.name}>
											<Link
												to={item.href}
												className="text-base text-gray-500 hover:text-gray-900"
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-12 md:mt-0">
								<h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
									Support
								</h3>
								<ul role="list" className="mt-4 space-y-4">
									{navigation.support.map((item) => (
										<li key={item.name}>
											<Link
												to={item.href}
												className="text-base text-gray-500 hover:text-gray-900"
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
									Services
								</h3>
								<ul role="list" className="mt-4 space-y-4">
									{navigation.services.map((item) => (
										<li key={item.name}>
											<Link
												to={item.href}
												className="text-base text-gray-500 hover:text-gray-900"
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-12 md:mt-0">
								<h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
									Misc
								</h3>
								<ul role="list" className="mt-4 space-y-4">
									{navigation.misc.map((item) => (
										<li key={item.name}>
											<Link
												to={item.href}
												className="text-base text-gray-500 hover:text-gray-900"
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
					<div className="mt-8 xl:mt-0">
						<h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
							Subscribe to our newsletter
						</h3>
						<p className="mt-4 text-base text-gray-500">
							The latest news, articles, and resources, sent to your inbox
							weekly.
						</p>
						<Form className="mt-4 sm:flex sm:max-w-md">
							<Label htmlFor="email-address" className="sr-only">
								Email address
							</Label>
							<Input
								type="email"
								name="email-address"
								id="email-address"
								autoComplete="email"
								required
								className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-indigo-500"
								placeholder="Enter your email"
							/>
							<div className="mt-3 rounded-md sm:ml-3 sm:mt-0 sm:flex-shrink-0">
								<button
									type="submit"
									className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Subscribe
								</button>
							</div>
						</Form>
					</div>
				</div>
				<div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
					<div className="flex space-x-6 md:order-2">
						{navigation.social.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className="text-gray-400 hover:text-gray-500"
							>
								<span className="sr-only">{item.name}</span>
								{item.icon && item.icon({ className: 'w-4 h-4' })}
							</Link>
						))}
					</div>
					<p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
						&copy; {new Date().getFullYear()} Metabase, Inc. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
