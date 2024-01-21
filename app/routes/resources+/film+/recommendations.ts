import { json, type LoaderFunctionArgs } from '@remix-run/server-runtime'
import { oneHourAgo } from '#app/utils/constants'
import { generateFilmRecommendations } from '#app/utils/recommendations.server'

// TODO: THIS SHOULD ONLY BE ABLE TO BE RUN BY SERVER SOMEHOW
export async function loader({ request }: LoaderFunctionArgs) {
	await generateFilmRecommendations(oneHourAgo().date).catch(error => {
		return json({ success: false, error })
	})

	return json({ success: true })
}
