import { useState, useEffect } from 'react'
import { Logo } from '../logo'
import { Icon } from '../ui/icon'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { NavItems, SideNav } from './side-nav'

export const MobileSidebar = () => {
	const [open, setOpen] = useState(false)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<div className="flex items-center justify-center gap-2">
						<Icon name="dots-horizontal" />
						<Logo />
					</div>
				</SheetTrigger>
				<SheetContent side="left" className="w-72">
					<div className="px-1 py-6 pt-16">
						<SideNav items={NavItems} setOpen={setOpen} />
					</div>
				</SheetContent>
			</Sheet>
		</>
	)
}
