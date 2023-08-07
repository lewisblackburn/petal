import { useInputEvent } from '@conform-to/react'
import React, { useId, useRef } from 'react'
import { Input } from '~/components/ui/input.tsx'
import { Label } from '~/components/ui/label.tsx'
import { Checkbox, type CheckboxProps } from '~/components/ui/checkbox.tsx'
import { Textarea } from '~/components/ui/textarea.tsx'
import {
	Select,
	SelectContent,
	type SelectProps,
	SelectTrigger,
	SelectValue,
} from './ui/select.tsx'
import { cn } from '~/utils/misc.tsx'
import {
	Popover,
	PopoverContent,
	type PopoverProps,
	PopoverTrigger,
} from './ui/popover.tsx'
import { Button } from './ui/button.tsx'
import { Icon } from './ui/icon.tsx'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './ui/command.tsx'

export type ListOfErrors = Array<string | null | undefined> | null | undefined

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
				<li key={e} className="text-[10px] text-foreground-danger">
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
			<div className="px-4 pb-3 pt-1">
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
	textareaProps: React.InputHTMLAttributes<HTMLTextAreaElement>
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
			<div className="px-4 pb-3 pt-1">
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
	buttonProps: CheckboxProps
	errors?: ListOfErrors
	className?: string
}) {
	const fallbackId = useId()
	const buttonRef = useRef<HTMLButtonElement>(null)
	// To emulate native events that Conform listen to:
	// See https://conform.guide/integrations
	const control = useInputEvent({
		// Retrieve the checkbox element by name instead as Radix does not expose the internal checkbox element
		// See https://github.com/radix-ui/primitives/discussions/874
		ref: () =>
			buttonRef.current?.form?.elements.namedItem(buttonProps.name ?? ''),
		onFocus: () => buttonRef.current?.focus(),
	})
	const id = buttonProps.id ?? buttonProps.name ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined
	return (
		<div className={className}>
			<div className="flex gap-2">
				<Checkbox
					id={id}
					ref={buttonRef}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					{...buttonProps}
					onCheckedChange={state => {
						control.change(Boolean(state.valueOf()))
						buttonProps.onCheckedChange?.(state)
					}}
					onFocus={event => {
						control.focus()
						buttonProps.onFocus?.(event)
					}}
					onBlur={event => {
						control.blur()
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
	children,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: SelectProps
	errors?: ListOfErrors
	className?: string
	children: React.ReactNode
}) {
	const [open, setOpen] = React.useState(false)
	const fallbackId = useId()
	const buttonRef = useRef<HTMLButtonElement>(null)
	const control = useInputEvent({
		ref: () =>
			buttonRef.current?.form?.elements.namedItem(buttonProps.name ?? ''),
		onFocus: () => buttonRef.current?.focus(),
		onBlur: () => buttonRef.current?.blur(),
	})
	const id = buttonProps.id ?? buttonProps.name ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined

	const { name, ...props } = buttonProps

	return (
		<div className={className}>
			<Label htmlFor={id} {...labelProps} />
			<Select
				open={open}
				onOpenChange={setOpen}
				name={buttonProps.name}
				defaultValue={buttonProps.defaultValue?.toString()}
			>
				<SelectTrigger
					id={id}
					ref={buttonRef}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					{...props}
					onChange={state => {
						control.change(state.currentTarget.value)
						buttonProps.onChange?.(state)
					}}
					onFocus={event => {
						control.focus()
						buttonProps.onFocus?.(event)
					}}
					onBlur={event => {
						control.blur()
						buttonProps.onBlur?.(event)
					}}
					type="button"
				>
					<SelectValue placeholder={labelProps.children} />
				</SelectTrigger>
				<SelectContent>{children}</SelectContent>
			</Select>
			<div className="px-4 pb-3 pt-1">
				{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
			</div>
		</div>
	)
}

export function SearchSelectField({
	labelProps,
	buttonProps,
	options,
	errors,
	className,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	buttonProps: PopoverProps
	options: Array<{ label: string; value: string }>
	errors?: ListOfErrors
	className?: string
}) {
	const [value, setValue] = React.useState(buttonProps.defaultValue)
	const [open, setOpen] = React.useState(false)
	const fallbackId = useId()
	const buttonRef = useRef<HTMLButtonElement>(null)
	const control = useInputEvent({
		ref: () =>
			buttonRef.current?.form?.elements.namedItem(buttonProps.name ?? ''),
		onFocus: () => buttonRef.current?.focus(),
		onBlur: () => buttonRef.current?.blur(),
	})
	const id = buttonProps.id ?? buttonProps.name ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined

	const { name, ...props } = buttonProps

	return (
		<div className={className}>
			<input
				name={buttonProps.name}
				defaultValue={buttonProps.defaultValue?.toString()}
				value={value}
				className="hidden"
			/>
			<Label htmlFor={id} {...labelProps} />
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger
					id={id}
					ref={buttonRef}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					{...props}
					onChange={state => {
						console.log(state)
						control.change(state.currentTarget.value)
						buttonProps.onChange?.(state)
					}}
					onFocus={event => {
						control.focus()
						buttonProps.onFocus?.(event)
					}}
					onBlur={event => {
						control.blur()
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
											setValue(currentValue === value ? '' : currentValue)
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
