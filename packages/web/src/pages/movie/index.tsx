import * as React from "react"
import {
  Text,
  Flex,
  Button,
  IconButton,
  Icon,
  Center,
  Spinner,
  Grid,
  Tooltip,
  Slider,
  SliderTrack,
  Box,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react"
import { Form } from "components/Form"
import { useForm } from "lib/hooks/useForm"
import { Input } from "components/Input"
import { Select } from "components/Select"
import Link from "components/Link"

import { HomeLayout } from "components/HomeLayout"
import Yup from "lib/yup"
import { gql } from "@apollo/client"
import { QueryMode, SortOrder, useMoviesQuery } from "lib/graphql"
import { Poster } from "components/Poster"
import { getOrderBy } from "components/Table"
import { FiEye, FiEyeOff } from "react-icons/fi"
const _ = gql`
  fragment MovieItem on Movie {
    id
    title
    overview
    posters
  }
`

const __ = gql`
  query Movies(
    $orderBy: [MovieOrderByWithRelationAndSearchRelevanceInput!]
    $where: MovieWhereInput
    $skip: Int
  ) {
    movies(orderBy: $orderBy, where: $where, skip: $skip) {
      count
      items {
        ...MovieItem
      }
    }
  }
`

const SearchMovieSchema = Yup.object().shape({
  text: Yup.string(),
  sort: Yup.string(),
  genre: Yup.string(),
  age: Yup.string(),
})

export default function Movies() {
  const [predicate, setPredicate] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState({ popularity: SortOrder.Asc })
  const [includeSeenMovies, setIncludeSeenMovies] = React.useState(false)
  const searchForm = useForm({ schema: SearchMovieSchema })

  const { data, loading } = useMoviesQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      where: {
        title: {
          contains: predicate
        }
      },
      orderBy: getOrderBy(sortOrder),
    },
  })

  const onSubmit = (d: any) => {
    setSortOrder(JSON.parse(d.sort))
    setPredicate(d.text)
  }

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  return (
    <Flex direction="column" gap={10}>
      <Flex direction="column" gap={2}>
        <Text fontSize="32" fontWeight={700} color="#100a55">
          Search movies
        </Text>
        <Text fontSize="md" fontWeight={500} color="#100a55">
          Found {data?.movies.count} movies in 312ms
        </Text>
      </Flex>
      <Form onSubmit={onSubmit} {...searchForm}>
        <Flex direction="column" gap={5}>
          <Flex align="center" gap={5}>
            <Input variant="primary" name="text" placeholder="Search..." />
            <Button variant="primary" size="xl" type="submit">
              Search
            </Button>

            <Tooltip
              label={`${includeSeenMovies ? "Don't i" : "I"}nclude movies you have seen`}
              aria-label="A tooltip"
            >
              <IconButton
                aria-label={`${includeSeenMovies ? "Don't i" : "I"}nclude movies you have seen`}
                variant="ghost"
                size="md"
                onClick={() => setIncludeSeenMovies((prev) => !prev)}
                icon={<Icon as={includeSeenMovies ? FiEye : FiEyeOff} fontSize="lg" />}
              />
            </Tooltip>
          </Flex>
          <Flex direction={["column", "column", "column", "row"]} align="center" gap={5}>
            <Select
              name="sort"
              options={[
                { label: "Popularity Ascending", value: JSON.stringify({ popularity: SortOrder.Asc }) },
                { label: "Popularity Descending", value: JSON.stringify({ popularity: SortOrder.Desc }) },
                { label: "Release Date Ascending", value: JSON.stringify({ releaseDate: SortOrder.Asc }) },
                { label: "Release Date Descending", value: JSON.stringify({ releaseDate: SortOrder.Desc }) },
                { label: "Title A-Z", value: JSON.stringify({ title: SortOrder.Asc }) },
                { label: "Title Z-A", value: JSON.stringify({ title: SortOrder.Desc }) },
              ]}
            />
            <Select name="genre" options={[{ label: "Romance", value: "" }]} />
            <Select name="age" options={[{ label: "U", value: "" }]} />
            <Select name="language" options={[{ label: "English", value: "" }]} />
          </Flex>
          <Flex direction={["column", "column", "column", "row"]} align="center" gap={5}>
            <Slider defaultValue={60} min={0} max={300} step={30}>
              <SliderTrack bg="purple.100">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg="brand.200" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
            <Slider defaultValue={60} min={0} max={300} step={30}>
              <SliderTrack bg="purple.100">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg="brand.200" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
            <Slider defaultValue={60} min={0} max={300} step={30}>
              <SliderTrack bg="purple.100">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg="brand.200" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          </Flex>
        </Flex>
      </Form>
      <Grid
        // Obviously change this to repeat statements
        templateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr", "1fr 1fr 1fr 1fr 1fr"]}
        gap={5}
      >
        {data?.movies.items.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <Poster src={movie.posters[0]} />
            {movie.title}
          </Link>
        ))}
      </Grid>
    </Flex>
  )
}

Movies.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
