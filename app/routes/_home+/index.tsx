import { type V2_MetaFunction } from '@remix-run/node'
import { Container } from '~/components/container.tsx'
import { ImageSlider } from '~/components/image-slider.tsx'

export const meta: V2_MetaFunction = () => [{ title: 'Petal' }]

export default function Index() {
	return (
		<div>
			<Container>
				<ImageSlider />
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
