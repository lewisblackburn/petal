import {
  Divider,
  Flex,
  Heading,
  Icon,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react"
import Card from "components/Card"
import { DefaultLayout } from "components/DefaultLayout"
import DotTab from "components/DotTab"
import { Form } from "components/Form"
import { Input } from "components/Input"
import { Select } from "components/Select"
import { NumberInput } from "components/NumberInput"
import { Textarea } from "components/Textarea"
import Yup from "lib/yup"
import { useForm } from "lib/hooks/useForm"
import { FiChevronRight } from "react-icons/fi"
import { MovieItemFragment, SortOrder, useMoviesLazyQuery } from "lib/graphql"
import { useState } from "react"
import { Column, getOrderBy, Sort, Table } from "components/Table"

const MovieDetailsSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  overview: Yup.string().required("Required"),
  tagline: Yup.string(),
  runtime: Yup.string(),
  budget: Yup.string(),
  revenue: Yup.string(),
  webpage: Yup.string(),
  imdbid: Yup.string(),
  tmdbid: Yup.string(),
})

export default function Edit() {
  const movieDetailsForm = useForm({ schema: MovieDetailsSchema })
  const [movie, setMovie] = useState({ title: "" })
  const [sort, setSort] = useState<Sort>({ createdAt: SortOrder.Desc })
  const [isDuplicates, setIsDuplicates] = useState(false)
  const [findDuplicates, { data, loading, fetchMore }] = useMoviesLazyQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      where: { title: { contains: movie.title } },
      orderBy: getOrderBy(sort),
    },
  })
  const [tabIndex, setTabIndex] = useState(0)

  const nextTab = () => setTabIndex((index) => index + 1)

  const onSubmit = (data: any) => {
    setMovie({ ...movie, ...data })
    if (tabIndex === 0) {
      findDuplicates().then((movies) => {
        if ((movies.data?.movies.count ?? 0) < 1) {
          setIsDuplicates(false)
          setTabIndex((index) => index + 2)
        } else {
          setIsDuplicates(true)
          nextTab()
        }
      })
    } else nextTab()
  }

  const movies = data?.movies.items

  const handleFetchMore = () => {
    if (!movies) return
    return fetchMore({ variables: { skip: movies.length } })
  }

  return (
    <Flex flexDir="column" align="center" gap="40px">
      <Flex flexDir="column" alignItems="center" gap="16px">
        <Heading as="h1" fontSize="32" color="brand.100">
          New Movie{" "}
        </Heading>
        <Text textAlign="center" variant="1" size="md" fontWeight={400} width={544}>
          Make sure you have filled in all the necessary fields and have uploaded all the required files.
        </Text>
      </Flex>
      <Tabs
        variant="unstyled"
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
        w="full"
        align="center"
      >
        <TabList display="flex" alignItems="center" gap="4">
          <DotTab>Movie Details</DotTab>
          <Icon as={FiChevronRight} />
          <DotTab isDisabled={!isDuplicates}>Duplicate Check</DotTab>
          <Icon as={FiChevronRight} />
          <DotTab>Verify & Save</DotTab>
        </TabList>
        <Divider my={20} />
        <TabPanels>
          <TabPanel>
            <Form onSubmit={onSubmit} {...movieDetailsForm}>
              <Flex justify="center">
                <Flex flexDir="column" gap="10">
                  <Card variant="secondary">
                    <Grid gridTemplateColumns="1fr" gap="5" width="full">
                      <Input name="title" label="Title" />
                      <Textarea name="overview" label="Overview" />
                    </Grid>
                  </Card>
                  <Card variant="secondary" width="fit-content">
                    <Grid gridTemplateColumns="1fr 1fr" gap="5">
                      <Input name="tagline" label="Tagline" />
                      <NumberInput name="runtime" label="Runtime" subLabel="(in minutes)" />
                      <NumberInput name="budget" label="Budget" subLabel="(US Dollars)" />
                      <NumberInput name="revenue" label="Revenue" subLabel="(US Dollars)" />
                      <GridItem colSpan={2}>
                        <Input name="webpage" label="Webpage (https://www.domain.com)" />
                      </GridItem>
                      <Select name="age" options={["U", "12", "12A", "15", "18"]} label="Age Rating" />
                      <Select name="language" options={["English"]} label="Language" />
                      <Select name="status" options={["Planning", "Released"]} label="Status" />
                      <Input name="release" label="Release Date" type="date" />
                    </Grid>
                  </Card>
                  <Card variant="secondary" width="fit-content">
                    <Grid gridTemplateColumns="1fr 1fr" gap="5">
                      <Input name="imdbid" label="IMDB" placeholder="ID" />
                      <Input name="tmdbid" label="TMDB" placeholder="ID" />
                      <Input name="twitter" label="Twitter" placeholder="ID" />
                      <Input name="facebook" label="Facebook" placeholder="ID" />
                    </Grid>
                  </Card>

                  <Button type="submit" variant="primary" size="long" alignSelf="flex-end">
                    Continue
                  </Button>
                </Flex>
              </Flex>
            </Form>
          </TabPanel>
          <TabPanel>
            <Flex flexDir="column" gap="10">
              <Card variant="secondary" w="full">
                <Table
                  noDataText="No movies found"
                  data={movies}
                  count={data?.movies.count}
                  sort={sort}
                  onSort={setSort}
                  getRowHref={(movie) => `/movie/${movie.id}`}
                  onFetchMore={handleFetchMore}
                  isLoading={loading && !!!data}
                >
                  <Column<MovieItemFragment> sortKey="id" header="ID" row={(movie) => movie.id} />
                  <Column<MovieItemFragment> sortKey="title" header="Title" row={(movie) => movie.title} />
                  <Column<MovieItemFragment>
                    sortKey="overview"
                    header="Overview"
                    row={(movie) => movie.overview}
                  />
                </Table>
              </Card>
              <Button onClick={nextTab} variant="primary" size="long" alignSelf="flex-end">
                Continue
              </Button>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justify="center">
              <Flex flexDir="column" gap="10">
                <Card variant="secondary" width="fit-content">
                  <Grid gridTemplateColumns="1fr 1fr" gap="5">
                    {Object.keys(movie).map((key, index) => (
                      <Text>
                        {key}: {Object.values(movie)[index]}
                      </Text>
                    ))}
                  </Grid>
                </Card>
                <Button variant="primary" size="long" type="submit" alignSelf="flex-end">
                  Submit
                </Button>
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

Edit.getLayout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>
