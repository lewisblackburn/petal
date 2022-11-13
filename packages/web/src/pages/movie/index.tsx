import * as React from "react"
import { Box, Center, Flex, Image, useBreakpointValue, Grid } from "@chakra-ui/react"
import NextLink from "next/link"

import { HomeLayout } from "components/HomeLayout"
import { gql } from "@apollo/client"
import { useMe } from "lib/hooks/useMe"

const _ = gql`
  query Movies {
    movies {
      id
      createdAt
      updatedAt
      title
      overview
      userId
      adult
      budget
      genres
      locked
      backdrops
      posters
      status
      revenue
      runtime
      tagline
      homepage
      language
      releaseDate
    }
  }
`

export default function Movies() {
  const templateColumns = useBreakpointValue({
    base: "repeat(3, 1fr)",
    xl: "repeat(4, 1fr)",
    "2xl": "repeat(5, 1fr)",
    "3xl": "repeat(6, 1fr)",
    "4xl": "repeat(7, 1fr)",
  })
  // const { me, loading: meLoading } = useMe()
  // const { data: moviesData } = useMoviesQuery()
  // console.log(me, moviesData)

  // if (meLoading)
  //   return (
  //     <Center>
  //       <Spinner />
  //     </Center>
  //   )
  // if (!me) return null
  return (
    <Flex gap="10">
      <Center w="full">
        <Grid templateColumns={templateColumns} gap="5">
          {new Array(24).fill(0).map((item) => (
            <NextLink key={item} href="/movies/movie" legacyBehavior passHref>
              <Image
                width="48"
                height="72"
                borderRadius="6"
                src="https://via.placeholder.com/1000"
                fallbackSrc="https://via.placeholder.com/1000"
                alt="Dan Abramov"
              />
            </NextLink>
          ))}
        </Grid>
      </Center>
    </Flex>
  )
}

Movies.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
