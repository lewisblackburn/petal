import {
  Divider,
  Flex,
  Heading,
  Icon,
  Select,
  NumberInput,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Grid,
} from "@chakra-ui/react"
import Card from "components/Card"
import { DefaultLayout } from "components/DefaultLayout"
import DotTab from "components/DotTab"
import { Form } from "components/Form"
import { Input } from "components/Input"
import Yup from "lib/yup"
import { useForm } from "lib/hooks/useForm"
import { FiChevronRight } from "react-icons/fi"
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
                    <Select name="language" label="Language">
                      <option value="english">English</option>
                    </Select>
                    <Input name="title" label="Title" />
                    <Input name="tagline" label="Tagline" />
                    <Textarea name="overview" label="Overview" />
                    <Select name="status" label="Status">
                      {Object.keys(Status).map((status: keyof typeof Status) => (
                        <option value={Status[status]}>{status}</option>
                      ))}
                    </Select>
                    <Select name="adult" label="adult">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Select>
                    <NumberInput>
                      <NumberInputField name="runtime" label="Runtime" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <NumberInput>
                      <NumberInputField name="revenue" label="Revenue (US Dollars)" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <NumberInput>
                      <NumberInputField name="budget" label="Budget (US Dollars)" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Input name="homepage" label="Homepage" />
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
