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
