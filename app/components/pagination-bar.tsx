import queryString from 'querystring'
import { useSearchParams } from '@remix-run/react'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination'

export interface PaginationBarProps {
	count: number
	take: number
}

export function PaginationBar(props: PaginationBarProps) {
	const [params, setParams] = useSearchParams()
	const currentPage = parseInt(params.get('page') || '1') as number
	const totalPages = Math.ceil(props.count / props.take)
	const isMore = currentPage < totalPages && totalPages !== 0
	const isFirstPage = currentPage == 1

	const handlePreviousPage = () => {
		if (isFirstPage) return

		const existingParams = queryString.parse(params.toString())
		setParams(
			queryString.stringify({
				...existingParams,
				page: (currentPage - 1).toString(),
			}),
		)
	}

	const handleNextPage = () => {
		if (!isMore) return

		const existingParams = queryString.parse(params.toString())
		setParams(
			queryString.stringify({
				...existingParams,
				page: (currentPage + 1).toString(),
			}),
		)
	}

	return (
		<div className="my-10 flex justify-center">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							className="cursor-pointer"
							onClick={handlePreviousPage}
						/>
					</PaginationItem>
					{!isFirstPage && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationLink>{currentPage}</PaginationLink>
					</PaginationItem>
					{isMore && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationNext
							className="cursor-pointer"
							onClick={handleNextPage}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
