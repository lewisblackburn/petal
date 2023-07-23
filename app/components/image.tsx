import { cn } from '~/utils/misc.ts'

export function Image({
  ...props
}: React.ComponentPropsWithoutRef<'img'> & {}) {
  return (
    <img
      {...props}
      alt={props.alt}
      className={cn('rounded-lg object-cover', props.className)}
    />
  )
}
