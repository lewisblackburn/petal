import * as React from "react"
import { Box, Container } from "@chakra-ui/react"
import { Nav } from "./Nav"
import Head from "next/head"
import { Footer } from "./Footer"

interface Props {
  children: React.ReactNode
}

export function HomeLayout(props: Props) {
  return (
    <Box>
      <Head>
        <title>Boilerplate</title>
      </Head>

      <Nav />

      <Box pt="35px">
        <Container maxW="8xl" mt={6} py={20}>
          {props.children}
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}
