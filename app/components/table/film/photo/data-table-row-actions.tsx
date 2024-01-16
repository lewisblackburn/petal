import { useFetcher, useParams } from '@remix-run/react'
import { type Row } from '@tanstack/react-table'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { type SetPrimaryFilmPhotoAction } from '#app/routes/resources+/film+/set-primary-photo'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const fetcher = useFetcher<typeof SetPrimaryFilmPhotoAction>()
	const { filmId } = useParams()

	return (
		<fetcher.Form method="POST" action="/resources/film/set-primary-photo">
			<input name="filmId" type="hidden" value={filmId ?? ''} />
			<input name="image" type="hidden" value={row.getValue('image')} />
			<input name="type" type="hidden" value={row.getValue('type')} />
			<StatusButton
				variant="secondary"
				className="w-full"
				status={
					fetcher.state === 'submitting'
						? 'pending'
						: fetcher.data?.status ?? 'idle'
				}
				type="submit"
				disabled={fetcher.state !== 'idle'}
			>
				Set as Primary
			</StatusButton>
		</fetcher.Form>
	)
}
