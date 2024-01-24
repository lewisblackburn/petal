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
import { StatusButton } from '#app/components/ui/status-button'
import {
	AddPersonImageSchema,
	type AddPersonPhotoAction,
} from '#app/routes/resources+/person+/add-photo.ts'

export function DataTableAddPhoto() {
	const { personId } = useParams()
	const fetcher = useFetcher<typeof AddPersonPhotoAction>()
	const [open, setOpen] = useState(false)

	const [form, fields] = useForm({
		id: 'add-person-photo-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddPersonImageSchema })
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
					Add Photo
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<fetcher.Form
					method="POST"
					action="/resources/person/add-photo"
					name="add-person-photo-form"
					encType="multipart/form-data"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Add Photo</DialogTitle>
						<DialogDescription>
							Add a new photo to the photos table.
						</DialogDescription>
					</DialogHeader>
					<div className="grid py-4">
						<input name="personId" type="hidden" value={personId} />
						<Field
							labelProps={{
								htmlFor: fields.image.id,
								children: 'Image',
							}}
							inputProps={{
								...conform.input(fields.image, { type: 'file' }),
								accept: 'image/*',
							}}
							errors={fields.image.errors}
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
								<span className="max-md:hidden">Add Photo</span>
							</Icon>
						</StatusButton>
					</DialogFooter>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
