import * as React from "react"
import { Text, Flex, Button } from "@chakra-ui/react"
import { Form } from "components/Form"
import { useForm } from "lib/hooks/useForm"
import { Input } from "components/Input"

import { HomeLayout } from "components/HomeLayout"
import Yup from "lib/yup"

const SearchSongSchema = Yup.object().shape({
  text: Yup.string(),
})

export default function Music() {
  const searchForm = useForm({ schema: SearchSongSchema })

  return (
    <Flex direction="column" gap={10}>
      <Flex direction="column" gap={2}>
        <Text fontSize="32" fontWeight={700} color="#100a55">
          Search songs
        </Text>
        <Text fontSize="md" fontWeight={500} color="#100a55">
          10,325 songs found in 312ms
        </Text>
      </Flex>
      <Form {...searchForm}>
        <Flex align="center" gap={5}>
          <Input variant="primary" name="text" placeholder="Search..." />
          <Button variant="primary" size="xl" type="submit">
            Search
          </Button>
        </Flex>
      </Form>
    </Flex>
  )
}

Music.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
