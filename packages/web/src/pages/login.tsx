import * as React from "react"
import { gql, useApolloClient } from "@apollo/client"
import Link from "next/link"
import { useRouter } from "next/router"

import { ACCESS_TOKEN, REFRESH_TOKEN_KEY } from "lib/config"
import type { LoginInput, MeQuery } from "lib/graphql"
import { MeDocument, useLoginMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import Yup from "lib/yup"
import { Form } from "components/Form"
import { withNoAuth } from "components/hoc/withNoAuth"
import { Input } from "components/Input"
import { Button, Center, Flex, Grid, Text } from "@chakra-ui/react"
import { DefaultLayout } from "components/DefaultLayout"

const _ = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
      refreshToken
    }
  }
`

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Must be at least 8 characters"),
})

function Login() {
  const client = useApolloClient()

  const [login, { loading }] = useLoginMutation()
  const router = useRouter()

  const form = useForm({ schema: LoginSchema })

  const onSubmit = (data: LoginInput) => {
    return form.handler(() => login({ variables: { data } }), {
      onSuccess: async (data) => {
        localStorage.setItem(ACCESS_TOKEN, data.login.token)
        await fetch("/api/login", {
          method: "post",
          body: JSON.stringify({
            [REFRESH_TOKEN_KEY]: data.login.refreshToken,
          }),
        })
        client.writeQuery<MeQuery>({ query: MeDocument, data: { me: data.login.user } })
        router.replace("/")
      },
    })
  }

  return (
    <Grid placeItems="center" h="full">
      <Form onSubmit={onSubmit} {...form}>
        <Flex flexDir="column" gap="32px" width={[96, 96, "500px"]}>
          <Flex flexDir="column" gap="8px">
            <Center>
              <Text fontSize="32px" fontWeight={700} color="brand.100">
                Welcome back
              </Text>
            </Center>

            <Center>
              <Text opacity="0.5" fontSize="16px" color="brand.100" fontWeight={500}>
                Welcome back! Please enter your details.
              </Text>
            </Center>
          </Flex>
          <Flex flexDir="column" gap="16px">
            <Input name="email" label="Email" type="email" placeholder="jim@gmail.com" />
            <Input name="password" label="Password" type="password" placeholder="••••••••••" />
            <Center fontSize="14px" fontWeight={500} color="#7065f0">
              <Link href="/forgot-password">Forgot password?</Link>
            </Center>
          </Flex>
          <Flex flexDir="column" gap="16px">
            <Button variant="primary" type="submit" isLoading={loading} isDisabled={loading}>
              Login
            </Button>
          </Flex>
          <Center fontSize="14px" gap={1}>
            <Text fontSize="14px" fontWeight={500} textAlign="center" color="#6c727f">
              Don’t have an account?
            </Text>
            <Text fontSize="14px" fontWeight={700} textAlign="center" color="#000929">
              <Link href="/register">Sign up for free</Link>
            </Text>
          </Center>
        </Flex>
      </Form>
    </Grid>
  )
}

Login.getLayout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>
export default withNoAuth(Login)
