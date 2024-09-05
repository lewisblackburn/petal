import { Icon, type IconName } from './ui/icon'

export default function Status({
	icon,
	title,
	children,
}: React.ComponentPropsWithoutRef<'div'> & {
	title: string
	icon: IconName
}) {
	return (
		<div className="flex flex-col space-y-1">
			<h1 className="font-semibold text-gray-500">{title}</h1>
			<div className="flex items-center space-x-2">
				<Icon name={icon} className="mt-0.5" />
				<p>{children}</p>
			</div>
		</div>
	)
}
