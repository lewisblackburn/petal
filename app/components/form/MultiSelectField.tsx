import { useInputControl } from '@conform-to/react'
import type * as PopoverPrimitive from '@radix-ui/react-popover'

import React, { useId } from 'react'
import { cn } from '#app/utils/misc.js'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../ui/command'
import { Icon } from '../ui/icon'
import { Label } from '../ui/label'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { ErrorList, type ListOfErrors } from './ErrorList'

export type OptionType = {
	label: string
	value: string
}

export type PopoverProps = Omit<
	React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>,
	'type'
> & {
	type?: string
}

export function MultiSelectField({
	labelProps,
	buttonProps,
	options,
	errors,
	className,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: PopoverProps & {
		name: string
		form: string
		value?: string
	}
	options: OptionType[]
	errors?: ListOfErrors
	className?: string
}) {
	const [open, setOpen] = React.useState(false)
	const [selected, setSelected] = React.useState<string[]>(
		// @ts-expect-error fix later
		buttonProps.defaultValue ?? [],
	)

	const { key, name, ...selectProps } = buttonProps
	const fallbackId = useId()
	const input = useInputControl({
		key,
		name: buttonProps.name,
		formId: buttonProps.form,
		initialValue: buttonProps.defaultValue?.toString(),
	})
	const id = buttonProps.id ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined

	const handleUnselect = (item: string) => {
		setSelected(selected.filter((i) => i !== item))
	}

	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<input
				name={buttonProps.name}
				// Hack as readOnly prevents errors from being displayed
				onChange={() => {}}
				value={JSON.stringify(selected)}
				className="hidden"
			/>
			<Label htmlFor={id} {...labelProps} />
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger
					{...selectProps}
					id={id}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					onFocus={(event) => {
						input.focus()
						buttonProps.onFocus?.(event)
					}}
					onBlur={(event) => {
						input.blur()
						buttonProps.onBlur?.(event)
					}}
					type="button"
					asChild
				>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="min-w-[300px] justify-between whitespace-nowrap aria-[invalid]:border-input-invalid"
					>
						{selected.length < 1 &&
							`Select ${labelProps.children?.toString().toLowerCase()}...`}
						<div className="flex flex-wrap gap-1">
							{selected.map((item) => (
								<Badge
									variant="secondary"
									key={item}
									className=""
									onClick={() => handleUnselect(item)}
								>
									{options.find((option) => option.value === item)?.label ??
										`Select ${labelProps.children
											?.toString()
											.toLowerCase()}...`}
									<button
										className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												handleUnselect(item)
											}
										}}
										onMouseDown={(e) => {
											e.preventDefault()
											e.stopPropagation()
										}}
										onClick={() => handleUnselect(item)}
									>
										<Icon
											name="cross-1"
											className="h-3 w-3 text-muted-foreground hover:text-foreground"
										/>
									</button>
								</Badge>
							))}
						</div>
						<Icon name="caret-sort" className="h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<Command>
						<CommandInput
							placeholder={`Search ${labelProps.children
								?.toString()
								.toLowerCase()}...`}
							className="h-9"
						/>
						<CommandList>
							<CommandEmpty>
								No {labelProps.children?.toString().toLowerCase()} found.
							</CommandEmpty>
							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										key={option.value}
										onSelect={() => {
											setSelected(
												selected.includes(option.value)
													? selected.filter((item) => item !== option.value)
													: [...selected, option.value],
											)
											setOpen(true)
										}}
									>
										<Icon
											name="check"
											className={cn(
												'mr-2 h-4 w-4',
												selected.includes(option.value)
													? 'opacity-100'
													: 'opacity-0',
											)}
										/>
										{option.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<div className="px-4 pb-3 pt-1">
				{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
			</div>
		</div>
	)
}
