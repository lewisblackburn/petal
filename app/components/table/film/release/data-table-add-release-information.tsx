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
import { StatusButton } from '#app/components/ui/status-button'
import {
	type AddFilmReleaseInformationAction,
	AddFilmReleaseInformationSchema,
} from '#app/routes/resources+/film+/add-release-information.ts'
import {
	COUNTRIES,
	FILM_RELEASE_TYPES,
	LANGUAGES,
} from '#app/utils/constants.ts'

export function DataTableAddReleaseInformation() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmReleaseInformationAction>()
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
		fetcher.data?.status === 'success' && setOpen(false)
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
						<FilterSelectField
							labelProps={{
								htmlFor: fields.country.id,
								children: 'Country',
							}}
							buttonProps={{
								...conform.input(fields.country),
							}}
							options={COUNTRIES.map(country => ({
								label: country.name,
								value: country.name,
							}))}
							errors={fields.country.errors}
						/>
						<FilterSelectField
							labelProps={{
								htmlFor: fields.language.id,
								children: 'Language',
							}}
							buttonProps={{
								...conform.input(fields.language),
							}}
							options={LANGUAGES.map(language => ({
								label: language.name,
								value: language.name,
							}))}
							errors={fields.language.errors}
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
						<StatusButton
							type="submit"
							variant="outline"
							status={
								fetcher.state !== 'idle'
									? 'pending'
									: fetcher.data?.status ?? 'idle'
							}
							disabled={fetcher.state !== 'idle'}
							className="w-full max-md:aspect-square max-md:px-0"
						>
							<Icon name="plus" className="scale-125 max-md:scale-150">
								<span className="max-md:hidden">Add Release Information</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
