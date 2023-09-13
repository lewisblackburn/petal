import { Link } from '@remix-run/react'
import { format } from 'date-fns'
import { getUserImgSrc } from '#app/utils/misc.tsx'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx'
import { Badge } from './ui/badge.tsx'
import { Icon } from './ui/icon.tsx'

export const ReviewCard = ({
	filmId,
	review,
}: {
	filmId: string
	review: any
}) => {
	return (
		<li className="flex gap-5 rounded-md bg-secondary p-5">
			<Avatar className="h-8 w-8">
				<Link to={`/users/${review.user.username}`}>
					<AvatarImage
						className="object-cover"
						src={getUserImgSrc(review.user.image?.id)}
						alt={review.user.name ?? review.user.username}
					/>
				</Link>
				<AvatarFallback>{review.user.initials}</AvatarFallback>
			</Avatar>
			<div className="flex w-full flex-col gap-1">
				<Link to={`/films/${filmId}/reviews/${review.id}`}>{review.title}</Link>
				<div className="flex gap-3">
					<Badge
						className="flex items-center justify-center rounded-md"
						variant="default"
					>
						<Icon name="star-filled" />
						<span className="ml-1">
							{review.rating?.value
								? (Math.round(review.rating.value * 100) / 100).toFixed(1)
								: 'N/A'}
						</span>
					</Badge>
					<div className="flex gap-1 text-sm text-muted-foreground">
						<span>Written by</span>
						<Link to={`/users/${review.user.username}`}>
							{review.user.name ?? review.user.username}
						</Link>
						<span>on</span>
						{format(new Date(review.createdAt ?? ''), 'dd MMMM yyyy')}
					</div>
				</div>
				<p className="mb-2 mt-4">{review.content}</p>
			</div>
		</li>
	)
}
