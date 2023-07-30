import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import { type CreditMember } from '@prisma/client'
import { useFetcher, useParams } from '@remix-run/react'
import { type Table } from '@tanstack/react-table'
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
import { DeleteFilmCreditsSchema } from '~/routes/resources+/film+/delete-credits.ts'

interface DataTableDeleteCredits<TData> {
  table: Table<TData>
}

export function DataTableDeleteCredits<TData>({
  table,
}: DataTableDeleteCredits<TData>) {
  const { filmId } = useParams()
  const peopleSelected = table
    .getSelectedRowModel()
    .rows.map(row => (row.original as CreditMember).id)
  const fetcher = useFetcher()

  const [form] = useForm({
    id: 'delete-film-credits-form',
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: DeleteFilmCreditsSchema })
    },
    shouldRevalidate: 'onBlur',
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        {peopleSelected.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <Icon name="plus" className="mr-2 h-4 w-4" />
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <fetcher.Form
          method="POST"
          action="/resources/film/delete-credits"
          name="delete-film-credits-form"
          {...form.props}
        >
          <DialogHeader>
            <DialogTitle>Delete Credits</DialogTitle>
            <DialogDescription>
              Delte people from the credits table.
            </DialogDescription>
          </DialogHeader>
          <div className="grid py-4">
            <input
              name="ids"
              type="hidden"
              value={JSON.stringify(peopleSelected)}
            />
            <input name="filmId" type="hidden" value={filmId} />
            <ErrorList errors={form.errors} id={form.errorId} />
          </div>
          <DialogFooter>
            <Button type="submit">Delete Credits</Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  )
}
