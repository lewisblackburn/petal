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
  Checkbox,
} from "@chakra-ui/react"
import Card from "components/Card"
import { DefaultLayout } from "components/DefaultLayout"
import DotTab from "components/DotTab"
import { Form } from "components/Form"
import { Input } from "components/Input"
import { Select } from "components/Select"
import { Textarea } from "components/Textarea"
import { NumberInput } from "components/NumberInput"
import Yup from "lib/yup"
import { useForm } from "lib/hooks/useForm"
import { FiChevronRight } from "react-icons/fi"
import { Genre, PersonItemFragment, SortOrder, Status, usePeopleQuery } from "lib/graphql"
import { useState } from "react"
import { Column, getOrderBy, Sort, Table } from "components/Table"
import { gql } from "@apollo/client"
import { PartialCheckIcon } from "components/PartialCheckIcon"
import dayjs from "dayjs"

const _ = gql`
  fragment PersonItem on Person {
    id
    name
    avatar
    createdAt
    updatedAt
  }
`

const __ = gql`
  query People($orderBy: [PersonOrderByWithRelationInput!], $where: PersonWhereInput, $skip: Int) {
    people(orderBy: $orderBy, where: $where, skip: $skip) {
      count
      items {
        ...PersonItem
      }
    }
  }
`

const PrimarySchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Must be at least 8 characters"),
})

export default function Edit() {
  const form = useForm({ schema: PrimarySchema })
  const [tabIndex, setTabIndex] = useState(0)

  const [selectedPeople, setSelectedPeople] = useState<string[]>([])
  const [sort, setSort] = useState<Sort>({ createdAt: SortOrder.Desc })
  const { data, loading, fetchMore } = usePeopleQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: getOrderBy(sort),
    },
  })

  const people = data?.people.items

  const handleFetchMore = () => {
    if (!people) return
    return fetchMore({ variables: { skip: people.length } })
  }

  const toggleSelected = (personId: string) => {
    if (selectedPeople.includes(personId)) {
      setSelectedPeople((selected) => selected.filter((d) => d !== personId))
    } else {
      setSelectedPeople((selected) => [...selected, personId])
    }
  }
  const toggleAll = () => {
    if (selectedPeople.length > 0) {
      setSelectedPeople([])
    } else if (people) {
      setSelectedPeople(people.map((person) => person.id))
    }
  }

  const isPartialSelection = !!people && selectedPeople.length > 0 && selectedPeople.length < people.length

  const onSubmit = () => {}

  return (
    <Flex flexDir="column" align="center" gap="40px">
      <Flex flexDir="column" alignItems="center" gap="16px">
        <Heading as="h1" fontSize="32" color="brand.100">
          Edit Movie
        </Heading>
        <Text textAlign="center" variant="1" size="md" fontWeight={400} width={544}>
          Make sure you have filled in all the necessary fields and have uploaded all the required files.
        </Text>
      </Flex>
      <Tabs variant="unstyled" index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList display="flex" alignItems="center" gap="4">
          <DotTab key={1}>Primary Facts</DotTab>
          <Icon as={FiChevronRight} />
          <DotTab key={2}>Cast</DotTab>
          <Icon as={FiChevronRight} />
          <DotTab key={3}>Crew</DotTab>
          <Icon as={FiChevronRight} />
          <DotTab key={4}>Genres</DotTab>
          <Icon as={FiChevronRight} />
          <DotTab key={5}>Misc</DotTab>
        </TabList>
        <Divider my={10} />
        <TabPanels>
          <TabPanel>
            <Flex justify="center">
              <Form onSubmit={onSubmit} {...form}>
                <Flex flexDir="column" gap="10">
                  <Card variant="secondary" width="fit-content">
                    <Grid gridTemplateColumns="1fr 1fr" gap="5">
                      <Select
                        name="language"
                        label="Language"
                        placeholder="Language"
                        options={[
                          { label: "English", value: "English" },
                          { label: "Russian", value: "Russian" },
                        ]}
                      />
                      <Input name="title" label="Title" placeholder="Title" />
                      <Input name="tagline" label="Tagline" placeholder="Tagline" />
                      <Select
                        name="status"
                        label="Status"
                        placeholder="Status"
                        options={Object.keys(Status)}
                      />
                      <GridItem colSpan={2}>
                        <Textarea name="overview" label="Overview" placeholder="Overview" />
                      </GridItem>
                      <Select name="Adult" label="Adult" placeholder="Adult" options={["Yes", "No"]} />
                      <NumberInput name="runtime" label="Runtime" placeholder="Runtime" />
                      <NumberInput
                        name="revenue"
                        label="Revenue"
                        placeholder="Revenue"
                        subLabel="(US Dollars)"
                      />
                      <NumberInput
                        name="budget"
                        label="Budget"
                        placeholder="Budget"
                        subLabel="(US Dollars)"
                      />
                      <GridItem colSpan={2}>
                        <Input name="homepage" label="Homepage" placeholder="Homepage" />
                      </GridItem>
                    </Grid>
                  </Card>
                  <Card variant="secondary" width="fit-content">
                    <Grid gridTemplateColumns="1fr 1fr" gap="5">
                      <Input name="imdb" label="IMDB ID" />
                      <Input name="twitter" label="Twitter" />
                      <Input name="instagram" label="Instagram" />
                      <Input name="facebook" label="Facebook" />
                    </Grid>
                  </Card>
                  <Button
                    onClick={() => setTabIndex((index) => index + 1)}
                    variant="primary"
                    size="xl"
                    type="submit"
                    alignSelf="flex-end"
                  >
                    Continue
                  </Button>
                </Flex>
              </Form>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justify="center">
              <Card variant="secondary" w="full">
                <Table
                  noDataText="No people found"
                  data={people}
                  count={data?.people.count}
                  sort={sort}
                  onSort={setSort}
                  // getRowHref={(person) => `/person/${person.id}`}
                  onFetchMore={handleFetchMore}
                  isLoading={loading && !!!data}
                >
                  <Column<PersonItemFragment>
                    hasNoLink
                    display={{ base: "none", md: "flex" }}
                    maxW="30px"
                    header={
                      <Checkbox
                        colorScheme="purple"
                        zIndex={100}
                        isChecked={data && data.people.count > 0 && selectedPeople.length > 0}
                        onChange={toggleAll}
                        iconColor="white"
                        {...(isPartialSelection && { icon: <PartialCheckIcon color="white" /> })}
                      />
                    }
                    row={(person) => (
                      <Checkbox
                        colorScheme="purple"
                        isChecked={selectedPeople.includes(person.id)}
                        iconColor="white"
                        onChange={() => toggleSelected(person.id)}
                      />
                    )}
                  />
                  <Column<PersonItemFragment> sortKey="name" header="Name" row={(person) => person.name} />
                  <Column<PersonItemFragment>
                    sortKey="createdAt"
                    header="Created"
                    row={(person) => dayjs(person.createdAt).format("DD/MM/YYYY")}
                  />
                  <Column<PersonItemFragment>
                    sortKey="updatedAt"
                    header="Updated"
                    row={(person) => dayjs(person.updatedAt).format("DD/MM/YYYY")}
                  />
                </Table>
              </Card>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justify="center">
              <Form onSubmit={onSubmit} {...form}>
                <Flex flexDir="column" gap="10">
                  <Card variant="secondary" width="fit-content">
                    A Table Here
                  </Card>
                </Flex>
              </Form>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justify="center">
              <Form onSubmit={onSubmit} {...form}>
                <Flex flexDir="column" gap="10">
                  <Card variant="secondary" width="fit-content"></Card>
                </Flex>
              </Form>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justify="center">
              <Form onSubmit={onSubmit} {...form}>
                <Flex flexDir="column" gap="10">
                  <Card variant="secondary" width="fit-content">
                    A Table Here
                  </Card>
                </Flex>
              </Form>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

Edit.getLayout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>
