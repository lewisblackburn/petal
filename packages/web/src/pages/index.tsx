import * as React from "react"
import { Box, Center } from "@chakra-ui/react"
import Head from "next/head"

import { HomeLayout } from "components/HomeLayout"
import { Limiter } from "components/Limiter"

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Boilerplate</title>
      </Head>

      <Limiter pt={20} minH="calc(100vh - 65px)">
        this is a test
      </Limiter>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
