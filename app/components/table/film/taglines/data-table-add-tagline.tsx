import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react'
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
	type action as AddFilmTaglineAction,
	AddFilmTaglineSchema,
} from '#app/routes/resources+/film+/add-tagline.ts'

export function DataTableAddTagline() {
	const { filmId } = useParams()
	const fetcher = useFetcher<typeof AddFilmTaglineAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-film-tagline',
		constraint: getZodConstraint(AddFilmTaglineSchema),
		lastResult: fetcher.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: AddFilmTaglineSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	useEffect(() => {
		fetcher.data?.result.status === 'success' && setOpen(false)
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
					Add Tagline
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/film/add-tagline"
					{...getFormProps(form)}
				>
					<DialogHeader>
						<DialogTitle>Add Tagline</DialogTitle>
						<DialogDescription>
							Add a new tagline to the taglines table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="filmId" type="hidden" value={filmId} />
						<Field>
							<Label htmlFor={fields.tagline.id}>Tagline</Label>
							<InputConform meta={fields.tagline} type="text" />
							{fields.tagline.errors && (
								<FieldError>{fields.tagline.errors}</FieldError>
							)}
						</Field>
					</div>
					<DialogFooter>
						<StatusButton
							type="submit"
							variant="outline"
							name="intent"
							value="add-tagline"
							status={
								fetcher.state !== 'idle' ? 'pending' : form.status ?? 'idle'
							}
							disabled={fetcher.state !== 'idle'}
							className="w-full max-md:aspect-square max-md:px-0"
						>
							<Icon name="plus" className="scale-125 max-md:scale-150">
								<span className="max-md:hidden">Add Tagline</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
