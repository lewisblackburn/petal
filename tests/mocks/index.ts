import closeWithGrace from 'close-with-grace'
import { setupServer } from 'msw/node'
import { handlers as awsHandlers } from './aws.ts'
import { handlers as githubHandlers } from './github.ts'
import { handlers as resendHandlers } from './resend.ts'
import { handlers as TMDBHandlers } from './tmdb.ts'

export const server = setupServer(
	...awsHandlers,
	...githubHandlers,
	...resendHandlers,
	...TMDBHandlers,
)

server.listen({ onUnhandledRequest: 'warn' })

if (process.env.NODE_ENV !== 'test') {
	console.info('🔶 Mock server installed')

	closeWithGrace(() => {
		server.close()
	})
}
