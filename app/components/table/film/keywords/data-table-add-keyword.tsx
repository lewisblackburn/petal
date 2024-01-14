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
import { AddFilmKeywordAction, AddFilmKeywordSchema } from '#app/routes/resources+/film+/add-keyword.ts'

export function DataTableAddKeyword() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmKeywordAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-keyword-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmKeywordSchema })
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
					Add Keyword
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-keyword"
					name="add-film-keyword-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Add Keyword</DialogTitle>
						<DialogDescription>
							Add a new keyword to the keywords table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<Field
							labelProps={{
								htmlFor: fields.keyword.id,
							}}
							inputProps={{
								...conform.input(fields.keyword, { type: 'text' }),
							}}
							errors={fields.keyword.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button variant="default" type="submit">
							Add Keyword
						</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
