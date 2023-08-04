import { type V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => [{ title: 'Petal' }]

export default function Index() {
	return <div></div>
}
