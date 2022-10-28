import * as React from "react"
import { Box, Center, Heading, Text, Spinner, Flex, Button, Select, Input } from "@chakra-ui/react"
import Head from "next/head"

import { HomeLayout } from "components/HomeLayout"
import { Limiter } from "components/Limiter"
import { gql } from "@apollo/client"
import { useMe } from "lib/hooks/useMe"
import { useMoviesQuery, Genre } from "lib/graphql"

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
      backdrop
      poster
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
  const { me, loading: meLoading } = useMe()
  const { data: moviesData } = useMoviesQuery()
  console.log(moviesData)

  if (meLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  // if (!me) return null
  return (
    <Box>
      <Head>
        <title>Boilerplate</title>
      </Head>

      <Limiter pt={20} minH="calc(100vh - 65px)">
        <Heading as="h1" size="lg">
          Search movies to watch
        </Heading>
        <Flex align="center" gap="5" py="5">
          <Box>
            <Input placeholder="Title" size="md" />
          </Box>
          <Box>
            <Select placeholder="Sort By">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box>
            <Select placeholder="Genres">
              {Object.keys(Genre).map((g) => (
                <option key={g} value={Genre[g]}>
                  {g}
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            <Select placeholder="Platform">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box>
            <Select placeholder="Age Rating">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Button>Search</Button>
        </Flex>
      </Limiter>
    </Box>
  )
}

Movies.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
