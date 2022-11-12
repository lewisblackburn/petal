import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Button, Center, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import type { MutationForgotPasswordArgs } from "lib/graphql"
import { useForgotPasswordMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useToast } from "lib/hooks/useToast"
import Yup from "lib/yup"
import { Form } from "components/Form"
import { HomeLayout } from "components/HomeLayout"
import { Input } from "components/Input"
import { DefaultLayout } from "components/DefaultLayout"

const _ = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

const ResetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
})

export default function ForgotPassword() {
  const router = useRouter()
  const defaultValues = { email: "" }

  const form = useForm({ schema: ResetSchema, defaultValues })
  const [reset, { loading }] = useForgotPasswordMutation()
  const toast = useToast()

  const handleSubmit = async (variables: MutationForgotPasswordArgs) => {
    return form.handler(() => reset({ variables }), {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Email has been sent to " + variables.email,
        })
        router.push("/")
      },
    })
  }
  return (
    <Grid placeItems="center" h="full">
      <Form onSubmit={handleSubmit} {...form}>
        <Flex flexDir="column" gap="32px" width={[96, 96, "500px"]}>
          <Flex flexDir="column" gap="8px">
            <Center>
              <Text fontSize="32px" fontWeight={700} color="brand.100">
                Forgot your password?
              </Text>
            </Center>
            <Center>
              <Text opacity="0.5" fontSize="16px" color="brand.100" fontWeight={500}>
                Enter your email below for password reset instructions.
              </Text>
            </Center>
          </Flex>
          <Flex flexDir="column" gap="16px">
            <Input autoFocus name="email" placeholder="Email" />
          </Flex>
          <Flex flexDir="column" gap="16px">
            <Button variant="primary" type="submit" isLoading={loading} isDisabled={loading}>
              Send instructions
            </Button>
          </Flex>
          <Center fontSize="14px" gap={1}>
            <Text fontSize="14px" fontWeight={700} textAlign="center" color="#000929">
              <Link href="/login">Login</Link>
            </Text>
          </Center>
        </Flex>
      </Form>
    </Grid>
  )
}
ForgotPassword.getLayout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>
