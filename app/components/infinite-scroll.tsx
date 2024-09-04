import queryString from 'querystring'
import { useSearchParams } from '@remix-run/react'
import { useInView } from 'react-intersection-observer'
import { Button } from './ui/button.tsx'

export interface InfiniteScrollProps<Data> {
	data: Array<Data>
	count: number
	take: number
}

export function InfiniteScroll<Data>(props: InfiniteScrollProps<Data>) {
	const [params, setParams] = useSearchParams()
	const currentPage = parseInt(params.get('page') || '1') as number
	const totalPages = Math.ceil(props.count / props.take)
	const isMore = currentPage < totalPages && totalPages !== 0

	const handleSetPage = (page: number) => {
		if (!isMore) return

		const existingParams = queryString.parse(params.toString())
		setParams(
			queryString.stringify({ ...existingParams, page: page.toString() }),
			{ state: { data: props.data }, preventScrollReset: true },
		)
	}

	const { ref } = useInView({
		threshold: 1,
		onChange: (inView) => {
			if (inView) handleSetPage(currentPage + 1)
		},
	})

	return (
		<div ref={ref} className="my-10 flex justify-center">
			{isMore ? (
				<Button onClick={() => handleSetPage(currentPage + 1)}>
					Load More
				</Button>
			) : (
				<Button disabled>No More</Button>
			)}
		</div>
	)
}
