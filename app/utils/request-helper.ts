import { type Prisma } from '@prisma/client'

export type Sort = { orderBy: string; order: Prisma.SortOrder }

export function getOrderBy(orderBy: string, order: string) {
	let object = {} as { [key: string]: unknown }
	const result = object
	const arr = orderBy.split('.')
	for (let i = 0; i < arr.length - 1; i++) {
		// @ts-ignore
		object = object[arr[i]] = {}
	}
	// @ts-ignore
	object[arr[arr.length - 1]] = order
	return result
}

export type DefaultOrder = { orderBy: string; order: Prisma.SortOrder }

export function getOrderByParams(
	request: Request,
	defaultOrder?: DefaultOrder,
) {
	const url = new URL(request.url)
	const orderBy = url.searchParams.get('orderBy') || undefined
	const order = url.searchParams.get('order') || undefined
	if (!orderBy && !order && defaultOrder) {
		return getOrderBy(defaultOrder.orderBy, defaultOrder.order)
	}
	if (!orderBy || !order) return undefined
	return getOrderBy(orderBy, order)
}

export const DEFAULT_TAKE = 10
export function getPaginationParams(request: Request, defaultTake?: number) {
	const url = new URL(request.url)
	const page = parseInt(url.searchParams.get('page') || '1') || 1
	const take = defaultTake || DEFAULT_TAKE
	const skip = (page - 1) * take
	return { skip, take }
}
export function getSearchParams(request: Request) {
	const url = new URL(request.url)
	const search = url.searchParams.get('search') || undefined
	return search
}

export type TableParams = {
	skip?: number
	take?: number
	search?: string
	orderBy?: { [key: string]: Prisma.SortOrder }
}

export function getTableParams(
	request: Request,
	defaultTake?: number,
	defaultOrder?: DefaultOrder,
) {
	const pagination = getPaginationParams(request, defaultTake)
	const orderBy = getOrderByParams(request, defaultOrder)
	const search = getSearchParams(request)
	return { ...pagination, search, orderBy }
}
