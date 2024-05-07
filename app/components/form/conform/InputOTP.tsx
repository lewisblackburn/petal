import {
	type FieldMetadata,
	unstable_useControl as useControl,
} from '@conform-to/react'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { type ElementRef, useRef, type ComponentProps } from 'react'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '#app/components/ui/input-otp.js'

export function InputOTPConform({
	meta,
	length = 6,
	pattern = REGEXP_ONLY_DIGITS_AND_CHARS,
	autoCapitalise,
	...props
}: {
	meta: FieldMetadata<string>
	length: number
	pattern?: string
	autoCapitalise?: boolean
} & Partial<ComponentProps<typeof InputOTP>>) {
	const inputOTPRef = useRef<ElementRef<typeof InputOTP>>(null)
	const control = useControl(meta)

	const capitaliseInput = (value: string) => {
		return value.toUpperCase()
	}

	return (
		<>
			<input
				ref={control.register}
				name={meta.name}
				defaultValue={meta.initialValue}
				tabIndex={-1}
				className="sr-only"
				onFocus={() => {
					inputOTPRef.current?.focus()
				}}
			/>
			<InputOTP
				{...props}
				name={`${meta.name}-inner`}
				ref={inputOTPRef}
				value={control.value ?? ''}
				onChange={(newValue: string) => {
					if (!autoCapitalise) return control.change(newValue)
					return control.change(capitaliseInput(newValue))
				}}
				onBlur={control.blur}
				maxLength={6}
				pattern={pattern}
				render={undefined}
			>
				<InputOTPGroup>
					{new Array(length).fill(0).map((_, index) => (
						<InputOTPSlot key={index} index={index} />
					))}
				</InputOTPGroup>
			</InputOTP>
		</>
	)
}
