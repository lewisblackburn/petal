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
import { FiChevronRight, FiLock } from "react-icons/fi"
import { Status } from "lib/graphql"

const PrimarySchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Must be at least 8 characters"),
})

export default function Edit() {
  const form = useForm({ schema: PrimarySchema })

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
      <Tabs variant="unstyled">
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
              <Card variant="secondary" width="fit-content">
                <Form {...form}>
                  <Grid gridTemplateColumns="1fr 1fr" gap="5">
                    <Select
                      name="language"
                      label="Language"
                      placeholder="Language"
                      options={["English", "Russian"]}
                    />
                    <Input name="title" label="Title" placeholder="Title" />
                    <Input name="tagline" label="Tagline" placeholder="Tagline" />
                    <Select name="status" label="Status" placeholder="Status" options={Object.keys(Status)} />
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
                    <NumberInput name="budget" label="Budget" placeholder="Budget" subLabel="(US Dollars)" />
                    <GridItem colSpan={2}>
                      <Input name="homepage" label="Homepage" placeholder="Homepage" />
                    </GridItem>
                  </Grid>
                </Form>
              </Card>
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

Edit.getLayout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>
