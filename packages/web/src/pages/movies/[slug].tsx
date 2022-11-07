import * as React from "react"
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react"
import { FiChevronLeft, FiHeart, FiImage, FiPlay, FiPlus, FiStar } from "react-icons/fi"

import { HomeLayout } from "components/HomeLayout"
import { gql } from "@apollo/client"
// import { useMe } from "lib/hooks/useMe"

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
    <Flex flexDir="column" gap="10">
      <Flex align="center" gap="1" color="brand.200">
        <Icon as={FiChevronLeft} />
        <Text fontWeight={600} fontSize="16">
          Back to movies
        </Text>
      </Flex>
      <Flex justify="space-between">
        <Flex flexDir="column">
          <Heading as="h1" fontSize="40" color="brand.100">
            About Time
          </Heading>
          <Text opacity="0.5" fontSize="20" fontWeight={500} color="brand.100">
            What if every moment in life came with a second chance?
          </Text>
        </Flex>
        <Flex gap="16px" alignSelf="end">
          <Button variant="secondary" size="lg">
            <Icon as={FiStar} />
            Rate
          </Button>
          <Button variant="secondary" size="lg">
            <Icon as={FiHeart} />
            Favourite
          </Button>
          <Button variant="secondary" size="lg">
            <Icon as={FiPlus} />
            Add to watchlist
          </Button>
        </Flex>
      </Flex>
      <Grid templateColumns="3fr 1fr" templateRows="1fr 1fr" gap="5">
        <GridItem rowSpan={2} bg="gray.50"></GridItem>
        <Box bg="gray.50" height="72"></Box>
        <Box bg="gray.50" height="72" position="relative">
          <Button position="absolute" bottom={5} right={5} variant="tertiary" size="lg">
            <Icon as={FiImage} />
            View all photos
          </Button>
        </Box>
      </Grid>
      <Grid templateColumns="3fr 1fr" gap="5">
        <Flex flexDir="column" gap="10">
          <Flex height="115px" borderRadius="8px" borderWidth="1.5px" borderColor="purple.200">
            test
          </Flex>
          <Flex flexDirection="column" gap="4">
            <Heading as="h3" fontSize="24px" fontWeight={700} color="brand.100">
              Overview
            </Heading>
            <Text opacity="0.7" fontSize="16px" fontWeight={500} color="brand.100">
              The night after another unsatisfactory New Year's party, Tim's father tells his son that the men
              in his family have always had the ability to travel through time. They can't change history, but
              they can change what happens and has happened in their own lives. Thus begins the start of a
              lesson in learning to appreciate life itself as it is, as it comes, and most importantly, the
              people living alongside us.
            </Text>
          </Flex>
        </Flex>
        <Flex
          borderRadius="8px"
          borderWidth="1.5px"
          borderColor="purple.400"
          p="4"
          flexDir="column"
          align="start"
          gap="2px"
          w="full"
        >
          <Text opacity="0.5" fontSize="14" fontWeight={500} color="brand.100">
            Platform
          </Text>
          <Flex flexDir="column" gap="24px" w="full">
            <Flex align="center" gap="2px">
              <Text fontSize="24px" fontWeight={700} color="brand.200">
                $5.00
              </Text>
              <Text opacity="0.5" fontSize="14px" fontWeight={500} color="brand.100">
                /month
              </Text>
            </Flex>
            <Button width="full" variant="primary" size="lg">
              <Icon as={FiPlay} />
              Watch now
            </Button>
            <Divider />
            <Text fontSize="18px" fontWeight={700} color="brand.100">
              Pick a platform
            </Text>
            {/* Turn Into RadioCard */}
            <Tabs variant="unstyled">
              <TabList gap="16px">
                <Tab
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="10"
                  width="156px"
                  paddingLeft="16px"
                  paddingRight="16px"
                  paddingTop="14px"
                  paddingBottom="14px"
                  borderRadius=" 8px"
                  borderWidth="1.5px"
                  borderColor="purple.400"
                  fontWeight={500}
                  color="brand.100"
                  fontSize="14px"
                  _selected={{
                    fontWeight: 700,
                    borderColor: "brand.200",
                    background: "purple.300",
                    color: "brand.200",
                  }}
                >
                  <Text>YouTube</Text>
                </Tab>
                <Tab
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="10"
                  width="156px"
                  paddingLeft="16px"
                  paddingRight="16px"
                  paddingTop="14px"
                  paddingBottom="14px"
                  borderRadius=" 8px"
                  borderWidth="1.5px"
                  borderColor="purple.400"
                  fontWeight={500}
                  color="brand.100"
                  fontSize="14px"
                  _selected={{
                    fontWeight: 700,
                    borderColor: "brand.200",
                    background: "purple.300",
                    color: "brand.200",
                  }}
                >
                  <Text>Netflix</Text>
                </Tab>
              </TabList>
            </Tabs>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  )
}

Movies.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
