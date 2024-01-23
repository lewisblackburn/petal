import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
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
import {
	type ImportFilmFromTMDBAction,
	ImportFilmFromTMDBSchema,
} from '#app/routes/resources+/film+/import-film-from-tmdb'

export default function DashboardFilmsRoute() {
	const fetcher = useFetcher<typeof ImportFilmFromTMDBAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'import-film-from-tmdb-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: ImportFilmFromTMDBSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	// const isSubmitting = useIsPending({
	// 	formMethod: 'GET',
	// 	formAction: '/resources/search',
	// })

	useEffect(() => {
		if (fetcher.data?.status !== 'error') setOpen(false)
	}, [fetcher])

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
					action="/resources/film/import-film-from-tmdb"
					name="import-film-from-tmdb-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Import Film</DialogTitle>
						<DialogDescription>Import a new film from TMDB.</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<Field
							labelProps={{
								htmlFor: fields.tmdbID.id,
								children: 'Name',
							}}
							inputProps={{
								...conform.input(fields.tmdbID, { type: 'text' }),
								autoComplete: 'off',
							}}
							errors={fields.tmdbID.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button variant="default" type="submit">
							Import Film
						</Button>
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
