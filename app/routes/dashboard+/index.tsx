import { Button } from '#app/components/ui/button.js'
import { Icon } from '#app/components/ui/icon.js'
import { Form } from '@remix-run/react'

export default function DashboardPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">Dashboard</h1>
			<p className="mt-4 text-center text-lg">
				Welcome to your dashboard. You are now logged in.
			</p>
			<Form action="/logout" method="POST" className="mt-3">
				<Button type="submit" variant="link" size="pill">
					<Icon name="exit" className="scale-125 max-md:scale-150">
						Logout
					</Icon>
				</Button>
			</Form>
		</div>
	)
}
