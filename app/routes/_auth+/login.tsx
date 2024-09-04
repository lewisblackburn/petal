import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import {
	Form,
	json,
	Link,
	useActionData,
	useSearchParams,
} from '@remix-run/react'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.js'
import { CheckboxConform } from '#app/components/form/conform/Checkbox.js'
import { InputConform } from '#app/components/form/conform/Input.js'
import { ErrorList } from '#app/components/form/ErrorList.js'
import { Field, FieldError } from '#app/components/form/Field.js'
import { Label } from '#app/components/ui/label.js'
import { StatusButton } from '#app/components/ui/status-button.js'
import { login, requireAnonymous } from '#app/utils/auth.server.js'
import {
	providerNames,
	ProviderConnectionForm,
} from '#app/utils/connections.js'
import { checkHoneypot } from '#app/utils/honeypot.server.js'
import { useIsPending } from '#app/utils/misc.js'
import { PasswordSchema, UsernameSchema } from '#app/utils/user-validation.js'
import { handleNewSession } from './login.server'

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}

const LoginFormSchema = z.object({
	username: UsernameSchema,
	password: PasswordSchema,
	redirectTo: z.string().optional(),
	remember: z.boolean().optional(),
})

export async function loader({ request }: LoaderFunctionArgs) {
	await requireAnonymous(request)
	return json({})
}

export async function action({ request }: ActionFunctionArgs) {
	await requireAnonymous(request)
	const formData = await request.formData()
	checkHoneypot(formData)
	const submission = await parseWithZod(formData, {
		schema: (intent) =>
			LoginFormSchema.transform(async (data, ctx) => {
				if (intent !== null) return { ...data, session: null }

				const session = await login(data)
				if (!session) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Invalid username or password',
					})
					return z.NEVER
				}

				return { ...data, session }
			}),
		async: true,
	})

	if (submission.status !== 'success' || !submission.value.session) {
		return json(
			{ result: submission.reply({ hideFields: ['password'] }) },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const { session, remember, redirectTo } = submission.value

	return handleNewSession({
		request,
		session,
		remember: remember ?? false,
		redirectTo,
	})
}

export default function LoginPage() {
	const actionData = useActionData<typeof action>()
	const isPending = useIsPending()
	const [searchParams] = useSearchParams()
	const redirectTo = searchParams.get('redirectTo')

	const [form, fields] = useForm({
		id: 'login-form',
		constraint: getZodConstraint(LoginFormSchema),
		defaultValue: { redirectTo },
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: LoginFormSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<div className="h-screen w-screen">
			<div className="flex h-full items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>

					<div className="grid gap-4">
						<div className="grid gap-2">
							<Form method="POST" {...getFormProps(form)}>
								<HoneypotInputs />
								<Field>
									<Label htmlFor={fields.username.id}>Username</Label>
									<InputConform
										meta={fields.username}
										type="text"
										className="lowercase"
										autoComplete="username"
										autoFocus
									/>
									{fields.username.errors && (
										<FieldError>{fields.username.errors}</FieldError>
									)}
								</Field>
								<Field>
									<Label htmlFor={fields.password.id}>Password</Label>
									<InputConform
										meta={fields.password}
										type="password"
										autoComplete="current-password"
									/>
									{fields.password.errors && (
										<FieldError>{fields.password.errors}</FieldError>
									)}
								</Field>

								<div className="flex justify-between">
									<Field>
										<div className="flex items-center gap-2">
											<CheckboxConform meta={fields.remember} />
											<Label htmlFor={fields.remember.id}>Remember me</Label>
										</div>
										{fields.remember.errors && (
											<FieldError>{fields.remember.errors}</FieldError>
										)}
									</Field>
									<div>
										<Link
											to="/forgot-password"
											className="text-body-xs font-semibold"
										>
											Forgot password?
										</Link>
									</div>
								</div>

								<input
									{...getInputProps(fields.redirectTo, { type: 'hidden' })}
								/>
								<ErrorList errors={form.errors} id={form.errorId} />

								<div className="flex items-center justify-between gap-6 pt-3">
									<StatusButton
										className="w-full"
										status={isPending ? 'pending' : (form.status ?? 'idle')}
										type="submit"
										disabled={isPending}
									>
										Log in
									</StatusButton>
								</div>
							</Form>
							<ul className="mt-3 flex flex-col gap-3">
								{providerNames.map((providerName) => (
									<li key={providerName}>
										<ProviderConnectionForm
											type="Login"
											providerName={providerName}
											redirectTo={redirectTo}
										/>
									</li>
								))}
							</ul>
							<div className="flex items-center justify-center gap-2 pt-6 text-sm">
								<span className="text-muted-foreground">
									Don&apos;t have an account?{' '}
								</span>
								<Link
									to={
										redirectTo
											? `/signup?${encodeURIComponent(redirectTo)}`
											: '/signup'
									}
									className="underline"
								>
									Create an account
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const meta: MetaFunction = () => {
	return [{ title: 'Login to Petal' }]
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
