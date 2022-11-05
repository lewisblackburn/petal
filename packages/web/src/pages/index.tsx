import * as React from "react"
import { Box, Button } from "@chakra-ui/react"
import Head from "next/head"

import { HomeLayout } from "components/HomeLayout"
import { Limiter } from "components/Limiter"
import { gql } from "@apollo/client"
import { useCreateMovieMutation, Genre } from "lib/graphql"

const _ = gql`
  mutation CreateMovie($data: MovieInput!) {
    createMovie(data: $data) {
      id
    }
  }
`

export default function Home() {
  const [create] = useCreateMovieMutation()

  const onClick = async () => {
    await create({
      variables: {
        data: {
          title: "test",
          overview: "test",
          genres: [Genre.Action],
        },
      },
    })
  }

  return (
    <Box>
      <Head>
        <title>Boilerplate</title>
      </Head>

      <Limiter py={20} minH="calc(100vh - 65px)">
        this is a test
        <Button onClick={() => onClick()}>test</Button>
      </Limiter>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
