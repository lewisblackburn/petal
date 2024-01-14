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
import { type AddFilmCastMemberAction, AddFilmCastMemberSchema } from '#app/routes/resources+/film+/add-cast-member.ts'
import { PersonSearch } from '#app/routes/resources+/people.tsx'

export function DataTableAddCastMember() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmCastMemberAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-cast-member-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmCastMemberSchema })
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
					Add Person
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-cast-member"
					name="add-film-cast-member-form"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Add Person</DialogTitle>
						<DialogDescription>
							Add a new cast member to the cast table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<PersonSearch
							labelProps={{
								htmlFor: fields.personId.id,
								children: 'Person',
								autoFocus: true,
							}}
							buttonProps={{
								...conform.input(fields.personId, { type: 'text' }),
							}}
							errors={fields.personId.errors}
						/>
						<Field
							labelProps={{
								htmlFor: fields.character.id,
								children: 'Character',
							}}
							inputProps={{
								...conform.input(fields.character, { type: 'text' }),
								autoComplete: 'off',
							}}
							errors={fields.character.errors}
						/>
						<ErrorList errors={form.errors} id={form.errorId} />
					</div>
					<DialogFooter>
						<Button variant="default" type="submit">
							Add Person
						</Button>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
