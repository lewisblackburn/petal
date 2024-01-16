import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { ErrorList, Field } from '#app/components/forms.tsx'
import { Button } from '#app/components/ui/button.tsx'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '#app/components/ui/dialog.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { CountrySearch } from '#app/routes/resources+/countries.tsx'
import {
	type AddFilmAlternativeTitleAction,
	AddFilmAlternativeTitleSchema,
} from '#app/routes/resources+/film+/add-alternative-title'

export function DataTableAddAlternativeTitle() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmAlternativeTitleAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-alternative-title-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmAlternativeTitleSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		if (fetcher.data?.status !== 'error') setOpen(false)
	}, [fetcher])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="ml-auto hidden h-8 lg:flex"
				>
					<Icon name="plus" className="mr-2 h-4 w-4" />
					Add Alternative Title
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-alternative-title"
					name="add-film-alternative-title-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Add Alternative Title</DialogTitle>
						<DialogDescription>
							Add a new alternative title to the alternative titles table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<Field
							labelProps={{
								htmlFor: fields.alternativeTitle.id,
							}}
							inputProps={{
								...conform.input(fields.alternativeTitle, { type: 'text' }),
							}}
							errors={fields.alternativeTitle.errors}
						/>
						<CountrySearch
							labelProps={{
								htmlFor: fields.code.id,
								children: 'Country',
								autoFocus: true,
							}}
							buttonProps={{
								...conform.input(fields.code, { type: 'text' }),
							}}
							errors={fields.code.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button variant="default" type="submit">
							Add Alternative Title
						</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
