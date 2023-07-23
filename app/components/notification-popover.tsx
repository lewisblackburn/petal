import { Button } from './ui/button.tsx'
import { Icon } from './ui/icon.tsx'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover.tsx'

export function NotificationPopover() {
  // const user = useUser()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon name="bell" className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center"></PopoverContent>
    </Popover>
  )
}
