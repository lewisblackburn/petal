import {
	type FieldMetadata,
	unstable_useControl as useControl,
} from '@conform-to/react'
import React, { type FormEventHandler } from 'react'
import Image from '#app/components/image.js'
import { cn } from '#app/utils/misc.js'
import { Button } from '../../ui/button'
import {
	Command,
	CommandInput,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from '../../ui/command'
import { Icon } from '../../ui/icon'
import { Popover, PopoverTrigger, PopoverContent } from '../../ui/popover'

export function SearchSelectConform({
	meta,
	items,
	onInput,
}: {
	meta: FieldMetadata<string>
	items: { label: string; value: string; image?: string | null }[]
	onInput: FormEventHandler<HTMLInputElement>
}) {
	const [selectedItem, setSelectedItem] = React.useState<{
		label: string
		value: string
	}>()
	const triggerRef = React.useRef<HTMLButtonElement>(null)
	const control = useControl(meta)

	// if selectedItem and is not already in items, add it
	if (
		selectedItem &&
		!items.find((item) => item.value === selectedItem.value)
	) {
		items.push(selectedItem)
	}

	return (
		<div>
			<input
				className="sr-only"
				aria-hidden
				tabIndex={-1}
				ref={control.register}
				name={meta.name}
				defaultValue={meta.initialValue}
				onFocus={() => {
					triggerRef.current?.focus()
				}}
			/>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						ref={triggerRef}
						variant="outline"
						role="combobox"
						className={cn(
							'w-[300px] justify-between',
							!control.value && 'text-muted-foreground',
							'focus:ring-2 focus:ring-stone-950 focus:ring-offset-2',
						)}
					>
						{control.value
							? items.find((item) => item.value === control.value)?.label
							: 'Select item'}
						<Icon
							name="caret-sort"
							className="ml-2 h-4 w-4 shrink-0 opacity-50"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[300px] p-0">
					<Command>
						<CommandInput
							placeholder="Search item..."
							onInput={onInput}
							onFocus={onInput}
						/>
						<CommandList>
							<CommandEmpty>No item found.</CommandEmpty>
							<CommandGroup>
								{items.map((item) => (
									<CommandItem
										value={item.label}
										key={item.value}
										onSelect={() => {
											control.change(item.value)
											setSelectedItem(item)
										}}
									>
										{item.image ? (
											<Image
												src={item.image ?? ''}
												alt={item.value}
												className="mr-3 aspect-square h-12 w-12 rounded-md"
											/>
										) : (
											<Icon
												name="check"
												className={cn(
													'mr-2 h-4 w-4',
													item.value === control.value
														? 'opacity-100'
														: 'opacity-0',
												)}
											/>
										)}
										{item.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
