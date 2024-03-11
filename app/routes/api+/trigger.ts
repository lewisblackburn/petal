// NOTE: This is to prevent the build error:
// [commonjs--resolver] Server-only module referenced by client:
// '#app/jobs/recommendations.server' imported by route 'app/routes/api+/trigger.ts'
import { serverOnly$ } from 'vite-env-only'

// Remix will automatically strip files with side effects
// So you need to *export* your Job definitions like this:
import { job } from '#app/jobs/recommendations.server'
export const jobServerOnly = serverOnly$(job)

export { action } from '#app/utils/trigger.server'
