import { useEffect, useState } from 'react'
import { Icon } from './ui/icon'
import { Link } from '@remix-run/react'

export default function Banner() {
	// TODO: This should be set back to false if there is a new feature announcement
	const [isBannerSeen, setIsBannerSeen] = useState(false)

	useEffect(() => {
		const isBannerSeen = window.localStorage.getItem('isBannerSeen')

		if (isBannerSeen === null) {
			window.localStorage.setItem('isBannerSeen', String(true))
			setIsBannerSeen(true)
			return
		}

		setIsBannerSeen(isBannerSeen === 'true')
	}, [])

	function handleDismiss() {
		window.localStorage.setItem('isBannerSeen', String(false))
		setIsBannerSeen(false)
	}

	if (!isBannerSeen) {
		return null
	}

	return (
		<div className="fixed inset-x-0 top-0 pt-2 sm:pt-4">
			<div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
				<div className="rounded-lg bg-indigo-600 p-2 shadow-lg sm:p-3">
					<div className="flex flex-wrap items-center justify-between">
						<div className="flex w-0 flex-1 items-center">
							<span className="flex rounded-lg bg-indigo-800 p-2">
								<Icon
									name="volume-2"
									className="h-6 w-6 text-white"
									aria-hidden="true"
								/>
							</span>
							<p className="ml-3 truncate font-medium text-white">
								<span className="md:hidden">We announced a new feature!</span>
								<span className="hidden md:inline">
									Big news! We're excited to announce a brand new feature.
								</span>
							</p>
						</div>
						<div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
							<Link
								to="#"
								className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
							>
								Learn more
							</Link>
						</div>
						<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
							<button
								type="button"
								className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
								onClick={handleDismiss}
							>
								<span className="sr-only">Dismiss</span>
								<Icon
									name="cross-1"
									className="h-6 w-6 text-white"
									aria-hidden="true"
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
