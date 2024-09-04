import {
	type FieldMetadata,
	unstable_useControl as useControl,
} from '@conform-to/react'
import React from 'react'
import { getAllJobs } from '#app/utils/constants.js'
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

const jobs = getAllJobs().map((job) => ({
	label: job,
	value: job,
}))

export function JobPickerConform({ meta }: { meta: FieldMetadata<string> }) {
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
							? jobs.find((job) => job.value === control.value)?.label
							: 'Select a job'}
						<Icon
							name="caret-sort"
							className="ml-2 h-4 w-4 shrink-0 opacity-50"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[250px] p-0">
					<Command>
						<CommandInput placeholder="Search job..." />
						<CommandList>
							<CommandEmpty>No job found.</CommandEmpty>
							<CommandGroup>
								{jobs.map((job) => (
									<CommandItem
										value={job.label}
										key={job.value}
										onSelect={() => {
											control.change(job.value)
										}}
									>
										<Icon
											name="check"
											className={cn(
												'mr-2 h-4 w-4',
												job.value === control.value
													? 'opacity-100'
													: 'opacity-0',
											)}
										/>
										{job.label}
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
