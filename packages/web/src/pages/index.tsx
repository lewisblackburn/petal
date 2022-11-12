import * as React from "react"
import { Box, Button } from "@chakra-ui/react"

import { HomeLayout } from "components/HomeLayout"
import { gql } from "@apollo/client"
import { useUpdateMovieMutation } from "lib/graphql"

const _ = gql`
  mutation UpdateMovie($where: MovieWhereUniqueInput!, $data: MovieUpdateInput!) {
    updateMovie(where: $where, data: $data) {
      id
      title
    }
  }
`

export default function Home() {
  const [update] = useUpdateMovieMutation()

  const onClick = async () => {
    await update({
      variables: {
        data: {
          title: "test",
          overview: "this is a new overview",
        },
        where: {
          id: "33e2c582-84b3-49a8-97f1-03f8366d0515",
        },
      },
    })
  }

  return (
    <Box>
      <Button variant="primary" onClick={() => onClick()}>
        Update Movie
      </Button>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
