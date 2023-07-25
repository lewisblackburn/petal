import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import type { V2_MetaFunction } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { z } from 'zod'
import { Container } from '~/components/container.tsx'
import { ErrorList, Field } from '~/components/forms.tsx'
import { ImageSlider } from '~/components/image-slider.tsx'
import { StatusButton } from '~/components/ui/status-button.tsx'

export const meta: V2_MetaFunction = () => [{ title: 'Petal' }]

const ROUTE_PATH = '/resources/people'

const PersonSearchFormSchema = z.object({
	name: z.string().min(6),
})

export default function Index() {
	const fetcher = useFetcher()

	const [form, fields] = useForm({
		id: 'person-search-form',
		constraint: getFieldsetConstraint(PersonSearchFormSchema),
		lastSubmission: fetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: PersonSearchFormSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<div>
			<Container>
				<ImageSlider />
				<fetcher.Form action={ROUTE_PATH} method="POST" {...form.props}>
					<Field
						labelProps={{ children: 'Search' }}
						inputProps={{ ...conform.input(fields.name), autoFocus: true }}
						errors={fields.name.errors}
					/>
					<div className="flex flex-row-reverse justify-between">
						<StatusButton
							type="submit"
							name="intent"
							value="confirm"
							status={
								fetcher.state === 'submitting'
									? 'pending'
									: fetcher.data?.status ?? 'idle'
							}
						>
							Confirm
						</StatusButton>
					</div>
					<ErrorList errors={[...form.errors]} id={form.errorId} />
				</fetcher.Form>
			</Container>
		</div>
	)
}

// NOTE: File Upload Form
//
// <Form
// 	method="post"
// 	action="/resources/upload"
// 	encType="multipart/form-data"
// >
// 	<Input type="file" name="upload" />
// 	<Button type="submit">Upload</Button>
// </Form>
//
