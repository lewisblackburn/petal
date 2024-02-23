import { getInputProps, getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFetcher, type MetaFunction } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { ErrorList, Field } from '#app/components/forms'
import { Button } from '#app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '#app/components/ui/dialog'
import { Icon } from '#app/components/ui/icon'
import { StatusButton } from '#app/components/ui/status-button'
import {
	type action as ImportFilmFromTMDBAction,
	ImportFilmSchema,
} from '#app/routes/resources+/film+/import'

export default function DashboardFilmsRoute() {
	const fetcher = useFetcher<typeof ImportFilmFromTMDBAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'import-film-form',
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ImportFilmSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		form.status === 'success' && setOpen(false)
	}, [form])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 w-36">
					<Icon name="plus" className="mr-2 h-4 w-4" />
					Import Film
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/import"
					name="import-film-form"
					{...getFormProps(form)}
				>
					<DialogHeader>
						<DialogTitle>Import Film</DialogTitle>
						<DialogDescription>Import a new film from TMDB.</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<Field
							labelProps={{
								htmlFor: fields.tmdbID.id,
								children: 'TMDB ID',
							}}
							inputProps={{
								...getInputProps(fields.tmdbID, { type: 'text' }),
								autoComplete: 'off',
							}}
							errors={fields.tmdbID.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<StatusButton
							type="submit"
							variant="outline"
							status={
								fetcher.state !== 'idle' ? 'pending' : form.status ?? 'idle'
							}
							disabled={fetcher.state !== 'idle'}
							className="w-full max-md:aspect-square max-md:px-0"
						>
							<Icon name="plus" className="scale-125 max-md:scale-150">
								<span className="max-md:hidden">Import Film</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}

export const meta: MetaFunction = () => [{ title: 'Dashboard | Petal' }]

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
