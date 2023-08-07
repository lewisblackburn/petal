import { Form, useSearchParams, useSubmit } from '@remix-run/react'
import { useDebounce, useIsSubmitting } from '~/utils/misc.tsx'
import { Button } from './ui/button.tsx'
import { Icon } from './ui/icon.tsx'
import { Input } from './ui/input.tsx'
import { Label } from './ui/label.tsx'
import { StatusButton } from './ui/status-button.tsx'

export function SearchBar({
	action,
	status,
	autoFocus = false,
	autoSubmit = false,
	hasType = false,
	hasButton = false,
}: {
	action: string
	status: 'idle' | 'pending' | 'success' | 'error'
	autoFocus?: boolean
	autoSubmit?: boolean
	hasType?: boolean
	hasButton?: boolean
}) {
	const [searchParams] = useSearchParams()
	const submit = useSubmit()
	const isSubmitting = useIsSubmitting({
		formMethod: 'GET',
		formAction: action,
	})

	const handleFormChange = useDebounce((form: HTMLFormElement) => {
		submit(form)
	}, 400)

	return (
		<Form
			method="GET"
			action={action}
			className="flex flex-wrap items-center justify-center gap-2"
			onChange={e => autoSubmit && handleFormChange(e.currentTarget)}
		>
			<div className="flex-1">
				<Label htmlFor="search" className="sr-only">
					Search
				</Label>
				<Input
					type="search"
					name="search"
					id="search"
					defaultValue={searchParams.get('search') ?? ''}
					placeholder="Search"
					className="md:w-[100px] lg:w-[300px]"
					autoFocus={autoFocus}
				/>
			</div>
			{hasButton && (
				<div>
					<StatusButton
						type="submit"
						status={isSubmitting ? 'pending' : status}
						className="flex w-full items-center justify-center"
						size="sm"
					>
						<Icon name="magnifying-glass" size="sm" />
						<span className="sr-only">Search</span>
					</StatusButton>
				</div>
			)}
			{hasType && (
				<Button type="button" size="icon">
					<Icon name="laptop" size="sm" />
				</Button>
			)}
		</Form>
	)
}
