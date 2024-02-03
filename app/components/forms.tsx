import { useInputControl } from '@conform-to/react'
import type * as PopoverPrimitive from '@radix-ui/react-popover'
import type * as SelectPrimitive from '@radix-ui/react-select'
import React, { useId, useRef } from 'react'
import { cn } from '#app/utils/misc.tsx'
import { Image } from './image.tsx'
import { Spinner } from './spinner.tsx'
import { Badge } from './ui/badge.tsx'
import { Button } from './ui/button.tsx'
import { Checkbox, type CheckboxProps } from './ui/checkbox.tsx'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './ui/command.tsx'
import { Icon } from './ui/icon.tsx'
import { Input } from './ui/input.tsx'
import { Label } from './ui/label.tsx'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover.tsx'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select.tsx'
import { Textarea } from './ui/textarea.tsx'

export type ListOfErrors = Array<string | null | undefined> | null | undefined

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

export type SelectProps = Omit<
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
	'type'
> & {
	type?: string
}

export function ErrorList({
	id,
	errors,
}: {
	errors?: ListOfErrors
	id?: string
}) {
	const errorsToRender = errors?.filter(Boolean)
	if (!errorsToRender?.length) return null
	return (
		<ul id={id} className="flex flex-col gap-1">
			{errorsToRender.map(e => (
				<li key={e} className="text-[10px] text-foreground-destructive">
					{e}
				</li>
			))}
		</ul>
	)
}

export function Field({
	labelProps,
	inputProps,
	errors,
	className,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	inputProps: React.InputHTMLAttributes<HTMLInputElement>
	errors?: ListOfErrors
	className?: string
}) {
	const fallbackId = useId()
	const id = inputProps.id ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined
	return (
		<div className={className}>
			<Label htmlFor={id} {...labelProps} />
			<Input
				id={id}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
				{...inputProps}
			/>
			<div className="min-h-[32px] px-4 pb-3 pt-1">
				{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
			</div>
		</div>
	)
}

export function TextareaField({
	labelProps,
	textareaProps,
	errors,
	className,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>
	errors?: ListOfErrors
	className?: string
}) {
	const fallbackId = useId()
	const id = textareaProps.id ?? textareaProps.name ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined
	return (
		<div className={className}>
			<Label htmlFor={id} {...labelProps} />
			<Textarea
				id={id}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
				{...textareaProps}
			/>
			<div className="min-h-[32px] px-4 pb-3 pt-1">
				{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
			</div>
		</div>
	)
}

export function CheckboxField({
	labelProps,
	buttonProps,
	errors,
	className,
}: {
	labelProps: JSX.IntrinsicElements['label']
	buttonProps: CheckboxProps & {
		name: string
		form: string
		value?: string
	}
	errors?: ListOfErrors
	className?: string
}) {
	const { key, defaultChecked, ...checkboxProps } = buttonProps
	const fallbackId = useId()
	const checkedValue = buttonProps.value ?? 'on'
	const input = useInputControl({
		key,
		name: buttonProps.name,
		formId: buttonProps.form,
		initialValue: defaultChecked ? checkedValue : undefined,
	})
	const id = buttonProps.id ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined

	return (
		<div className={className}>
			<div className="flex gap-2">
				<Checkbox
					{...checkboxProps}
					id={id}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					{...buttonProps}
					onCheckedChange={state => {
						input.change(state.valueOf() ? checkedValue : '')
						buttonProps.onCheckedChange?.(state)
					}}
					onFocus={event => {
						input.focus()
						buttonProps.onFocus?.(event)
					}}
					onBlur={event => {
						input.blur()
						buttonProps.onBlur?.(event)
					}}
					type="button"
				/>
				<label
					htmlFor={id}
					{...labelProps}
					className="self-center text-body-xs text-muted-foreground"
				/>
			</div>
			<div className="px-4 pb-3 pt-1">
				{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
			</div>
		</div>
	)
}

export function SelectField({
	labelProps,
	buttonProps,
	errors,
	className,
	options,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: SelectProps & {
		name: string
		form: string
		value?: string
	}
	errors?: ListOfErrors
	className?: string
	options: OptionType[]
}) {
	const [value, setValue] = React.useState(buttonProps.defaultValue?.toString())
	const [open, setOpen] = React.useState(false)
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

	return (
		<div className={className}>
			<Label htmlFor={id} {...labelProps} />
			<Select
				open={open}
				onOpenChange={setOpen}
				name={name}
				value={value}
				onValueChange={value => setValue(value)}
			>
				<SelectTrigger
					{...selectProps}
					id={id}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					onFocus={event => {
						input.focus()
						buttonProps.onFocus?.(event)
					}}
					onBlur={event => {
						input.blur()
						buttonProps.onBlur?.(event)
					}}
					type="button"
				>
					<SelectValue placeholder={labelProps.children} />
				</SelectTrigger>
				<SelectContent>
					{options.map(({ label, value }) => (
						<SelectItem key={value} value={value}>
							{label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<div className="px-4 pb-3 pt-1">
				{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
			</div>
		</div>
	)
}

export function FilterSelectField({
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
	const [value, setValue] = React.useState(buttonProps.defaultValue)
	const [open, setOpen] = React.useState(false)
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

	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<input
				name={name}
				// Hack as readOnly prevents errors from being displayed
				onChange={() => {}}
				value={value ?? ''}
				className="hidden"
			/>
			<Label htmlFor={id} {...labelProps} />
			<Popover open={open} onOpenChange={setOpen} modal={false}>
				<PopoverTrigger
					{...selectProps}
					id={id}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					onFocus={event => {
						input.focus()
						buttonProps.onFocus?.(event)
					}}
					onBlur={event => {
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
						{value
							? options.find(option => option.value === value)?.label
							: `Select ${labelProps.children?.toString().toLowerCase()}...`}
						<Icon
							name="caret-sort"
							className="ml-2 h-4 w-4 shrink-0 opacity-50"
						/>
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
								{options.map(option => (
									<CommandItem
										key={option.value}
										onSelect={currentValue => {
											setValue(option.value === value ? '' : option.value)
											setOpen(false)
										}}
									>
										{option.label}
										<Icon
											name="check"
											className={cn(
												'ml-auto h-4 w-4',
												value === option.value ? 'opacity-100' : 'opacity-0',
											)}
										/>
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

export function SearchSelectField({
	labelProps,
	buttonProps,
	items,
	busy = false,
	errors,
	className,
	onInput,
	onFocus,
	onCreate,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: PopoverProps & {
		name: string
		form: string
		value?: string
	}
	items: any
	busy: boolean
	errors?: ListOfErrors
	className?: string
	onInput: React.FormEventHandler<HTMLInputElement>
	onFocus: React.FocusEventHandler<HTMLInputElement>
	onCreate: (value: string) => void
}) {
	const [open, setOpen] = React.useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

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

	const defaultItem = buttonProps.defaultValue?.toString()
		? {
				// BUG: find a better way to do language label value
				// @ts-expect-error defaultlabel custom attribute in the DOM due to value being different from label in some cases
				label: buttonProps.defaultlabel ?? buttonProps.defaultValue?.toString(),
				value: buttonProps.defaultValue?.toString(),
			}
		: undefined

	const [selectedItem, setSelectedItem] = React.useState<
		null | undefined | { label: string; value: string; image?: string }
	>(defaultItem)

	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<input
				name={buttonProps.name}
				// Hack as readOnly prevents errors from being displayed
				onChange={() => {}}
				value={selectedItem?.value ?? ''}
				className="hidden"
			/>
			<Label htmlFor={id} {...labelProps} />
			<Popover open={open} onOpenChange={setOpen} modal>
				<PopoverTrigger
					{...selectProps}
					id={id}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					onChange={state => {
						input.change(state.currentTarget.value)
						buttonProps.onChange?.(state)
					}}
					onFocus={event => {
						input.focus()
						buttonProps.onFocus?.(event)
					}}
					onBlur={event => {
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
						{selectedItem
							? selectedItem.label
							: `Select ${labelProps.children?.toString().toLowerCase()}...`}
						<Icon
							name="caret-sort"
							className="ml-2 h-4 w-4 shrink-0 opacity-50"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<Command shouldFilter={false}>
						<CommandInput
							ref={inputRef}
							placeholder={`Search ${labelProps.children
								?.toString()
								.toLowerCase()}...`}
							onFocus={onFocus}
							onInput={onInput}
							className="h-9"
						/>
						<Spinner
							className="absolute right-0 top-[10px] mr-2"
							showSpinner={busy}
						/>
						<CommandList>
							<CommandEmpty className="-mb-2 p-2">
								<Button
									onClick={() => onCreate(inputRef.current?.value ?? '')}
									variant="ghost"
									size="sm"
									className="w-full"
								>
									<Icon name="plus" className="mr-2 h-4 w-4" />
									Create a {labelProps.children?.toString().toLowerCase()}
								</Button>
							</CommandEmpty>
							<CommandGroup>
								{items?.map(
									(item: { label: string; value: string; image?: string }) => (
										<CommandItem
											key={item.value}
											value={item.value}
											onSelect={currentValue => {
												const item = items.find(
													(item: any) =>
														item.value.toLowerCase() === currentValue,
												)
												setSelectedItem(
													currentValue === selectedItem?.value
														? selectedItem
														: item,
												)
												setOpen(false)
											}}
											className="flex items-center gap-3"
										>
											{item.image && (
												<Image
													src={item.image ?? ''}
													alt={item.value}
													className="aspect-square h-12 w-12 rounded-md"
												/>
											)}
											{item.label}
											<Icon
												name="check"
												className={cn(
													'ml-auto h-4 w-4',
													selectedItem?.value === item.value
														? 'opacity-100'
														: 'opacity-0',
												)}
											/>
										</CommandItem>
									),
								)}
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
		// @ts-expect-error TODO: fix type issue
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
		setSelected(selected.filter(i => i !== item))
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
					onFocus={event => {
						input.focus()
						buttonProps.onFocus?.(event)
					}}
					onBlur={event => {
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
							{selected.map(item => (
								<Badge
									variant="secondary"
									key={item}
									className=""
									onClick={() => handleUnselect(item)}
								>
									{options.find(option => option.value === item)?.label ??
										`Select ${labelProps.children
											?.toString()
											.toLowerCase()}...`}
									<button
										className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
										onKeyDown={e => {
											if (e.key === 'Enter') {
												handleUnselect(item)
											}
										}}
										onMouseDown={e => {
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
								{options.map(option => (
									<CommandItem
										key={option.value}
										onSelect={() => {
											setSelected(
												selected.includes(option.value)
													? selected.filter(item => item !== option.value)
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
