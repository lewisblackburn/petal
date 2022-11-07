import * as React from "react"
import { Button } from "@chakra-ui/react"

import { HomeLayout } from "components/HomeLayout"
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

  return <Button onClick={() => onClick()}>test</Button>
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
