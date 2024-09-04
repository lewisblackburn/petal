import { type FieldMetadata, getTextareaProps } from '@conform-to/react'
import { type ComponentProps } from 'react'
import { Textarea } from '../../ui/textarea'

export const TextareaConform = ({
	meta,
	...props
}: {
	meta: FieldMetadata<string>
} & ComponentProps<typeof Textarea>) => {
	return <Textarea {...getTextareaProps(meta)} {...props} />
}
