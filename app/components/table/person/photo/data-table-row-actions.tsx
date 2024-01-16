import { useFetcher, useParams } from '@remix-run/react'
import { type Row } from '@tanstack/react-table'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { type SetPrimaryPersonPhotoAction } from '#app/routes/resources+/person+/set-primary'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const fetcher = useFetcher<typeof SetPrimaryPersonPhotoAction>()
	const { personId } = useParams()

	return (
		<fetcher.Form method="POST" action="/resources/person/set-primary">
			<input name="personId" type="hidden" value={personId ?? ''} />
			<input name="image" type="hidden" value={row.getValue('image')} />
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
