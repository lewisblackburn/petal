import {
  type DataFunctionArgs,
  json,
  type V2_MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Search | Petal' }]
}
export async function loader({ request }: DataFunctionArgs) {
  console.log(request)
  return json('film')
}

export default function FilmSearch() {
  const data = useLoaderData<typeof loader>()
  console.log(data)

  return <div>film</div>
}
