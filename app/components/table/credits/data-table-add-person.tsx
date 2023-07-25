import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { useFetcher } from '@remix-run/react'
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
import { AddActorSchema } from '~/routes/resources+/add-actor.tsx'
import { PersonSearch } from '~/routes/resources+/people.tsx'

const ROUTE_PATH = '/resources/add-actor'

export function DataTableAddPerson() {
	const fetcher = useFetcher()

	const [form] = useForm({
		id: 'add-actor-form',
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: AddActorSchema })
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
				<fetcher.Form method="POST" action={ROUTE_PATH} {...form.props}>
					<DialogHeader>
						<DialogTitle>Add Person</DialogTitle>
						<DialogDescription>
							Add a new person to the credits table.
						</DialogDescription>
					</DialogHeader>
					<PersonSearch />
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
					<DialogFooter>
						<Button type="submit">Add Person</Button>
					</DialogFooter>
					<ErrorList errors={form.errors} id={form.errorId} />
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	)
}
