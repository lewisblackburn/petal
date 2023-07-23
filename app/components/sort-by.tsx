import { useSearchParams } from '@remix-run/react'
import { Button } from './ui/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card.tsx'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command.tsx'
import { Icon } from './ui/icon.tsx'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover.tsx'
import { Prisma } from '@prisma/client'
import React from 'react'
import queryString from 'querystring'
import { cn } from '~/utils/misc.ts'

const SORT_OPTIONS = [
  {
    label: 'Title Ascending',
    value: 'title ascending',
    prisma: { orderBy: 'title', order: Prisma.SortOrder.asc },
  },
  {
    label: 'Title Descending',
    value: 'title descending',
    prisma: { orderBy: 'title', order: Prisma.SortOrder.desc },
  },
  {
    label: 'Release Date Ascending',
    value: 'release date ascending',
    prisma: { orderBy: 'releaseDate', order: Prisma.SortOrder.asc },
  },
  {
    label: 'Release Date Descending',
    value: 'release date descending',
    prisma: { orderBy: 'releaseDate', order: Prisma.SortOrder.desc },
  },
]

export type Sort = { orderBy: string; order: Prisma.SortOrder }

export function SortBy() {
  const [value, setValue] = React.useState('')
  const [params, setParams] = useSearchParams()

  const handleSort = (order: Sort) => {
    const existingParams = queryString.parse(params.toString())
    setParams(queryString.stringify({ ...existingParams, ...order }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sort By</CardTitle>
        <CardDescription>Choose what to sort by</CardDescription>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <div className="flex w-full items-center justify-between">
                <span>
                  {value
                    ? SORT_OPTIONS.find(sort => sort.value === value)?.label
                    : 'Select a sort...'}
                </span>
                <Icon
                  name="chevron-down"
                  className="ml-2 h-4 w-4 text-muted-foreground"
                />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search sort..." className="h-9" />
              <CommandEmpty>No sort found.</CommandEmpty>
              <CommandGroup>
                {SORT_OPTIONS.map(sort => (
                  <CommandItem
                    key={sort.label}
                    onSelect={(currentValue: any) => {
                      setValue(currentValue === value ? '' : currentValue)
                      handleSort(sort.prisma)
                    }}
                  >
                    {sort.label}
                    <Icon
                      name="check"
                      className={cn(
                        'ml-auto',
                        value === sort.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  )
}
