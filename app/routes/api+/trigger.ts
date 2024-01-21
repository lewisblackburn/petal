import { createRemixRoute } from '@trigger.dev/remix'
import { client } from '#app/utils/trigger.server'

// Remix will automatically strip files with side effects
// So you need to *export* your Job definitions like this:
export * from '#app/jobs/recommendations.server'

export const { action } = createRemixRoute(client)
