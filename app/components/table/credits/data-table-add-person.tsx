import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher, useParams } from '@remix-run/react'
import { ErrorList } from '~/components/forms.tsx'
import { Button } from '~/components/ui/button.tsx'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog.tsx'
import { Icon } from '~/components/ui/icon.tsx'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select.tsx'
import { AddFilmCreditMemberSchema } from '~/routes/resources+/add-film-credit-member.tsx'
import { PersonSearch } from '~/routes/resources+/people.tsx'

export function DataTableAddPerson() {
	const { filmId } = useParams()
	const fetcher = useFetcher()

	const [form, fields] = useForm({
		id: 'add-film-credit-member-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddFilmCreditMemberSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<Dialog>
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
					action="/resources/add-film-credit-member"
					{...form.props}
				>
					<DialogHeader>
						<DialogTitle>Add Person</DialogTitle>
						<DialogDescription>
							Add a new person to the credits table.
						</DialogDescription>
					</DialogHeader>
					<input name="filmId" type="hidden" value={filmId} />
					<PersonSearch />
					<ErrorList errors={fields.personId.errors} id={fields.personId.id} />
					<Select name="fruit">
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select a fruit" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Fruits</SelectLabel>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">Blueberry</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">Pineapple</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<ErrorList errors={fields.fruit.errors} id={fields.fruit.id} />
					<DialogFooter>
						<Button type="submit">Add Person</Button>
					</DialogFooter>
					<ErrorList errors={form.errors} id={form.errorId} />
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
