import {
	type FieldMetadata,
	unstable_useControl as useControl,
} from '@conform-to/react'
import React from 'react'
import { LANGUAGES } from '#app/utils/constants.js'
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

const langauges = LANGUAGES.map((language) => ({
	label: language.name,
	value: language.name,
}))

export function LanguagePickerConform({
	meta,
}: {
	meta: FieldMetadata<string>
}) {
	const triggerRef = React.useRef<HTMLButtonElement>(null)
	const control = useControl(meta)

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
							'w-[250px] justify-between',
							!control.value && 'text-muted-foreground',
							'focus:ring-2 focus:ring-stone-950 focus:ring-offset-2',
						)}
					>
						{control.value
							? langauges.find((language) => language.value === control.value)
									?.label
							: 'Select language'}
						<Icon
							name="caret-sort"
							className="ml-2 h-4 w-4 shrink-0 opacity-50"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[250px] p-0">
					<Command>
						<CommandInput placeholder="Search language..." />
						<CommandList>
							<CommandEmpty>No language found.</CommandEmpty>
							<CommandGroup>
								{langauges.map((language) => (
									<CommandItem
										value={language.label}
										key={language.value}
										onSelect={() => {
											control.change(language.value)
										}}
									>
										<Icon
											name="check"
											className={cn(
												'mr-2 h-4 w-4',
												language.value === control.value
													? 'opacity-100'
													: 'opacity-0',
											)}
										/>
										{language.label}
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
