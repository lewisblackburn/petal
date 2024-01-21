import { json, type LoaderFunctionArgs } from '@remix-run/server-runtime'
import { oneWeekAgo } from '#app/utils/constants'
import { generateFilmRecommendations } from '#app/utils/recommendations.server'

export async function loader({ request }: LoaderFunctionArgs) {
	// Check if the request is internal (coming from the server)
	// @ts-expect-error TODO: FIX LATER
	const isInternalRequest = request.headers['x-internal-request'] === 'true'

	if (!isInternalRequest) {
		return json({ success: false })
	}

	await generateFilmRecommendations(oneWeekAgo().date).catch(error => {
		return json({ success: false, error })
	})

	return json({ success: true })
}
