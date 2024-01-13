import { conform, useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { ErrorList, Field, FilterSelectField } from '#app/components/forms.tsx'
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
import { AddFilmReleaseInformationSchema } from '#app/routes/resources+/film+/add-release-information.ts'
import { LanguageSearch } from '#app/routes/resources+/languages.tsx'
import { FILM_RELEASE_TYPES } from '#app/utils/constants.ts'

export function DataTableAddReleaseInformation() {
	const { filmId } = useParams()
	const fetcher = useFetcher()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-release-information-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmReleaseInformationSchema })
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
					Add Release Information
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-release-information"
					name="add-film-release-information-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Add Release Information</DialogTitle>
						<DialogDescription>
							Add a new release information to the release release information
							table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<CountrySearch
							labelProps={{
								htmlFor: fields.code.id,
								children: 'Country',
							}}
							buttonProps={{
								...conform.input(fields.code, { type: 'text' }),
							}}
							errors={fields.code.errors}
						/>
						<LanguageSearch
							labelProps={{
								htmlFor: fields.languageId.id,
								children: 'Language',
							}}
							buttonProps={{
								...conform.input(fields.languageId, { type: 'text' }),
							}}
							errors={fields.languageId.errors}
						/>
						<Field
							labelProps={{ children: 'Date' }}
							inputProps={{
								type: 'date',
								...conform.input(fields.date, { ariaAttributes: true }),
							}}
							errors={fields.date.errors}
						/>
						<Field
							labelProps={{
								htmlFor: fields.classification.id,
								children: 'Classification',
							}}
							inputProps={{
								...conform.input(fields.classification, { type: 'text' }),
							}}
							errors={fields.classification.errors}
						/>
						<FilterSelectField
							labelProps={{
								htmlFor: fields.type.id,
								children: 'Type',
							}}
							buttonProps={{
								...conform.input(fields.type),
							}}
							options={FILM_RELEASE_TYPES}
							errors={fields.type.errors}
						/>
						<Field
							labelProps={{
								htmlFor: fields.note.id,
								children: 'Note',
							}}
							inputProps={{
								...conform.input(fields.note, { type: 'text' }),
							}}
							errors={fields.note.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button variant="default" type="submit">
							Add Release Information
						</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
