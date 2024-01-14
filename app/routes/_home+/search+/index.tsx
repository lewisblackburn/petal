import {
  json,
  type MetaFunction,
  LoaderFunctionArgs,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [{ title: 'Search | Petal' }]
}
export async function loader({ request }: LoaderFunctionArgs) {
  console.log(request)
  return json('film')
}

export default function FilmSearch() {
  const data = useLoaderData<typeof loader>()
  console.log(data)

  return <div>film</div>
}
