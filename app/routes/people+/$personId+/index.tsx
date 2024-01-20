import { invariantResponse } from '@epic-web/invariant'
import { json, type DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import { Image } from '#app/components/image.tsx'
import { Slider } from '#app/components/slider.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { GENDERS } from '#app/utils/constants.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ params }: DataFunctionArgs) {
	const person = await prisma.person.findUnique({
		where: {
			id: params.personId,
		},
		select: {
			id: true,
			image: true,
			name: true,
			biography: true,
			knownForDepartment: true,
			gender: true,
			birthdate: true,
			years: true,
			placeOfBirth: true,
			// This is technically a list of all the Films/TV shows/etc the person has been in
			casts: {
				take: 10,
				select: {
					film: {
						select: {
							id: true,
							title: true,
							poster: true,
						},
					},
				},
				orderBy: {
					film: {
						voteAverage: 'desc',
					},
				},
			},
			crews: {
				take: 10,
				select: {
					film: {
						select: {
							id: true,
							title: true,
							poster: true,
						},
					},
				},
				orderBy: {
					film: {
						voteAverage: 'desc',
					},
				},
			},
			_count: {
				select: {
					casts: true,
					crews: true,
				},
			},
		},
	})

	invariantResponse(person, 'Not found', { status: 404 })

	return json({
		person: {
			...person,
			birthdate: person.birthdate
				? format(new Date(person.birthdate), 'yyyy-MM-dd')
				: null,
		},
	})
}

export default function PersonRoute() {
	const data = useLoaderData<typeof loader>()
	const knownForItems = [...data.person.casts, ...data.person.crews]

	return (
		<div className="container grid grid-cols-4 gap-10 py-6">
			<div className="col-span-1 flex flex-col gap-5">
				<Image
					src={data.person.image ?? ''}
					alt={data.person.name}
					className="aspect-[2/3]"
				/>

				<div className="flex flex-col gap-5">
					{data.person.knownForDepartment && (
						<div>
							<h2 className="font-bold">Known For</h2>
							{data.person.knownForDepartment}
						</div>
					)}
					<div>
						<h2 className="font-bold">Known Credits</h2>
						{data.person._count.casts + data.person._count.crews}
					</div>
					{data.person.gender && (
						<div>
							<h2 className="font-bold">Gender</h2>
							{
								GENDERS.filter(gender => gender.value === data.person.gender)[0]
									.label
							}
						</div>
					)}
					{data.person.birthdate && (
						<div>
							<h2 className="font-bold">Birthdate</h2>
							{data.person.birthdate} ({data.person.years} old)
						</div>
					)}
					{data.person.placeOfBirth && (
						<div>
							<h2 className="font-bold">Place of Birth</h2>
							{data.person.placeOfBirth}
						</div>
					)}
				</div>
				<Link to="edit" className="w-full">
					<Button size="sm" className="w-full">
						<Icon name="pencil-2" className="mr-2" />
						Edit Page
					</Button>
				</Link>
			</div>
			<div className="col-span-3 flex flex-col space-y-5">
				<h1 className="text-3xl font-bold">{data.person.name}</h1>
				<div className="flex flex-col gap-2">
					{data.person.biography?.split('\n').map((item, key) => {
						return (
							<p key={key} className="text-base font-normal">
								{item}
							</p>
						)
					})}
				</div>
				<div>
					{knownForItems.length > 0 && (
						<Slider
							title="Known For"
							items={knownForItems.map(credit => {
								return {
									to: `/films/${credit.film.id}`,
									image: credit.film.poster ?? '',
									title: credit.film.title,
								}
							})}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
