import * as React from "react"
import {
  Box,
  Center,
  Spinner,
  Flex,
  Button,
  Select,
  Input,
  Stack,
  CheckboxGroup,
  Image,
  Checkbox,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react"
import Head from "next/head"

import { HomeLayout } from "components/HomeLayout"
import { Limiter } from "components/Limiter"
import { gql } from "@apollo/client"
import { useMe } from "lib/hooks/useMe"
import { useMoviesQuery, Genre, AgeRating, Platform } from "lib/graphql"
import { readableAgeRating } from "lib/helpers/utils"

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
  const templateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",
    xl: "repeat(2, 1fr)",
    "2xl": "repeat(3, 1fr)",
    "3xl": "repeat(4, 1fr)",
    "4xl": "repeat(6, 1fr)",
  })
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
        <Flex gap="10">
          <Stack width="96" gap="5" py="5">
            <Box>
              <Input placeholder="Title" />
            </Box>
            <Box>
              <Select placeholder="Sort By">
                <option value="option1">Popularity ASC</option>
                <option value="option1">Popularity DESC</option>
              </Select>
            </Box>
            <Box>
              <CheckboxGroup defaultValue={[]}>
                <Stack spacing={[1, 5]}>
                  {Object.keys(Genre).map((g) => (
                    <Checkbox value={g} colorScheme="purple">
                      {g}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </Box>
            <Box>
              <Select placeholder="Platform">
                {Object.keys(Platform).map((p) => (
                  <option value={p}> {p}</option>
                ))}
              </Select>
            </Box>
            <Box>
              <Select placeholder="Age Rating">
                {Object.keys(AgeRating).map((a: keyof typeof AgeRating) => (
                  <option value={a}>{readableAgeRating(a)}</option>
                ))}
              </Select>
            </Box>
            <Button>Search</Button>
          </Stack>

          <Center w="full">
            <Grid templateColumns={templateColumns} gap="5">
              {new Array(24).fill(0).map((item) => (
                <Image
                  key={item}
                  width="64"
                  height="96"
                  borderRadius="6"
                  src="https://via.placeholder.com/1000"
                  fallbackSrc="https://via.placeholder.com/1000"
                  alt="Dan Abramov"
                />
              ))}
            </Grid>
          </Center>
        </Flex>
      </Limiter>
    </Box>
  )
}

Movies.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
