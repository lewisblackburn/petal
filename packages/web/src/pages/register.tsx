import * as React from "react"
import { gql, useApolloClient } from "@apollo/client"
import { Box, Button, Center, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import { ACCESS_TOKEN, REFRESH_TOKEN_KEY } from "lib/config"
import type { MeQuery, RegisterInput } from "lib/graphql"
import { MeDocument, useRegisterMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import Yup from "lib/yup"
import { Form } from "components/Form"
import { FormError } from "components/FormError"
import { withNoAuth } from "components/hoc/withNoAuth"
import { HomeLayout } from "components/HomeLayout"
import { Input } from "components/Input"
import { AuthLayout } from "components/AuthLayout"

const _ = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...Me
      }
      token
      refreshToken
    }
  }
`

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Must be at least 8 characters").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
})

function Register() {
  const client = useApolloClient()

  const [register, { loading }] = useRegisterMutation()
  const router = useRouter()

  const form = useForm({ schema: RegisterSchema })

  const onSubmit = (data: RegisterInput) => {
    return form.handler(() => register({ variables: { data } }), {
      onSuccess: async (data) => {
        localStorage.setItem(ACCESS_TOKEN, data.register.token)
        await fetch("/api/login", {
          method: "post",
          body: JSON.stringify({
            [REFRESH_TOKEN_KEY]: data.register.refreshToken,
          }),
        })
        client.writeQuery<MeQuery>({ query: MeDocument, data: { me: data.register.user } })
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
                Welcome
              </Text>
            </Center>

            <Center>
              <Text opacity="0.5" fontSize="16px" color="brand.100" fontWeight={500}>
                Welcome! Please enter your details.
              </Text>
            </Center>
          </Flex>
          <Flex flexDir="column" gap="16px">
            <Input name="firstName" label="First Name" placeholder="Lewis" />
            <Input name="lastName" label="Last Name" placeholder="Blackburn" />
            <Input name="email" label="Email" type="email" placeholder="jim@gmail.com" />
            <Input name="password" label="Password" type="password" placeholder="••••••••••" />
            <Input
              name="confirmPassword"
              label="Confirm Passoword"
              type="password"
              placeholder="••••••••••"
            />
          </Flex>
          <Flex flexDir="column" gap="16px">
            <Button variant="primary" type="submit" isLoading={loading} isDisabled={loading}>
              Register
            </Button>
          </Flex>
          <Center fontSize="14px" gap={1}>
            <Text fontSize="14px" fontWeight={500} textAlign="center" color="#6c727f">
              Already have an account?
            </Text>
            <Text fontSize="14px" fontWeight={700} textAlign="center" color="#000929">
              <Link href="/login">Login</Link>
            </Text>
          </Center>
        </Flex>
      </Form>
    </Grid>
  )
}

Register.getLayout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>
export default withNoAuth(Register)
