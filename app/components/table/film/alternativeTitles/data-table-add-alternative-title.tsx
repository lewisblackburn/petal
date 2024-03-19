import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { CountryPickerConform } from '#app/components/form/conform/CountryPicker.js'
import { InputConform } from '#app/components/form/conform/Input.js'
import { Field, FieldError } from '#app/components/form/Field.js'
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
import { Label } from '#app/components/ui/label.js'
import { StatusButton } from '#app/components/ui/status-button'
import {
	type action as AddFilmAlternativeTitleAction,
	AddFilmAlternativeTitleSchema,
} from '#app/routes/resources+/film+/add-alternative-title'

export function DataTableAddAlternativeTitle() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmAlternativeTitleAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-alternative-title-form',
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: AddFilmAlternativeTitleSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		if (form.status === 'success') {
			setOpen(false)
			form.reset()
		}
	}, [form])

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
					{...getFormProps(form)}
				>
					<DialogHeader>
						<DialogTitle>Add Alternative Title</DialogTitle>
						<DialogDescription>
							Add a new alternative title to the alternative titles table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<Field>
							<Label htmlFor={fields.alternativeTitle.id}>
								Alternative Title
							</Label>
							<InputConform meta={fields.alternativeTitle} type="text" />
							{fields.alternativeTitle.errors && (
								<FieldError>{fields.alternativeTitle.errors}</FieldError>
							)}
						</Field>
						<Field>
							<Label htmlFor={fields.country.id}>Country</Label>
							<CountryPickerConform meta={fields.country} />
							{fields.country.errors && (
								<FieldError>{fields.country.errors}</FieldError>
							)}
						</Field>
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
								<span className="max-md:hidden">Add Alternative Title</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
