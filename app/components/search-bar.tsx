import { Form, useSearchParams } from '@remix-run/react'
import { useIsPending } from '#app/utils/misc.tsx'
import { Spinner } from './spinner.tsx'
import { Input } from './ui/input.tsx'
import { Label } from './ui/label.tsx'

export function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const [searchParams] = useSearchParams()
  const isSubmitting = useIsPending({
    formMethod: 'GET',
    formAction: '/search',
  })

  return (
    <Form
      method="GET"
      action="/search"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <div className="relative flex-1">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          type="search"
          name="search"
          id="search"
          defaultValue={searchParams.get('search') ?? ''}
          placeholder="Search"
          className="w-full"
          autoFocus={autoFocus}
          autoComplete="off"
        />
        <Spinner
          className="absolute right-0 top-[12px] mr-2"
          showSpinner={isSubmitting}
        />
      </div>
    </Form>
  )
}
