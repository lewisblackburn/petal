import * as React from "react"
import {
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  AspectRatio,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  CheckboxGroup,
  Checkbox,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Radio,
  RadioGroup,
  Tabs,
  TabPanels,
  TabPanel,
  Center,
  Spinner,
} from "@chakra-ui/react"
import {
  FiAlertTriangle,
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiChevronLeft,
  FiClock,
  FiEdit,
  FiHeart,
  FiImage,
  FiPlay,
  FiPlus,
  FiStar,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi"
import { HiLanguage } from "react-icons/hi2"

import { HomeLayout } from "components/HomeLayout"
import Link from "components/Link"
import { Poster } from "components/Poster"
import { Backdrop } from "components/Backdrop"
import Card from "components/Card"
import { LinkButton } from "components/LinkButton"
import Tag from "components/Tag"
import Rating from "components/Rating"
import { Form } from "components/Form"
import { useForm } from "lib/hooks/useForm"
import Yup from "lib/yup"
import { Input } from "components/Input"
import { Textarea } from "components/Textarea"
import { Select } from "components/Select"
import { gql } from "@apollo/client"
import { Status, useMovieQuery } from "lib/graphql"
import { useRouter } from "next/router"
import { minuteToHour } from "lib/helpers/text"

const _ = gql`
  query Movie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      overview
      tagline
      popularity
      age_rating
      runtime
      homepage
      language
      videos
      posters
      backdrops
      contentScore
      locked
      adult
      budget
      revenue
      status
      releaseDate
      createdAt
      updatedAt
      rating {
        _avg {
          value
        }
      }
      genres {
        name
      }
      characters {
        name
        person {
          posters
        }
      }
      keywords {
        name
      }
    }
  }
`

const SearchListSchema = Yup.object().shape({
  text: Yup.string(),
})

export default function Movie() {
  const router = useRouter()
  const id = router.query.id as string
  const { data, loading } = useMovieQuery({
    variables: {
      movieId: id,
    },
    skip: !!!id
  })

  const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure()
  const { isOpen: isGalleryOpen, onOpen: onGalleryOpen, onClose: onGalleryClose } = useDisclosure()

  const [tabIndex, setTabIndex] = React.useState(0)
  const nextTab = () => setTabIndex((tab) => tab + 1)
  const prevTab = () => setTabIndex((tab) => tab - 1)

  const [selected, setSelected] = React.useState(-1)

  const listForm = useForm({ schema: SearchListSchema })
  const issueForm = useForm({ schema: SearchListSchema })

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  return (
    <>
      <Flex flexDir="column" gap="10">
        <Link href="/movies" size="md">
          <Flex align="center" gap="1">
            <Icon as={FiChevronLeft} />
            Back to movies
          </Flex>
        </Link>
        <Flex justify="space-between">
          <Flex flexDir="column">
            <Heading as="h1" fontSize="40" color="brand.100">
              {data?.movie.title ?? "skeleton"}
            </Heading>
            <Text variant="1" size="xl">
              What if every moment in life came with a second chance?
            </Text>
          </Flex>
          <Flex gap="4" alignSelf="end">
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button variant="secondary" size="lg">
                  <Icon as={FiStar} />
                  {selected > -1 ? "Rated" : "Rate"}
                </Button>
              </PopoverTrigger>
              <PopoverContent width="fit-content">
                <PopoverArrow />
                <PopoverBody display="flex" justifyContent="center" alignItems="center">
                  <Rating selected={selected} setSelected={setSelected} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Button variant="secondary" size="lg">
              <Icon as={FiHeart} />
              Favourite
            </Button>
            <Popover isLazy>
              <PopoverTrigger>
                <Button variant="secondary" size="lg">
                  <Icon as={FiPlus} />
                  Add to watchlist
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <Form {...listForm}>
                    <Flex display="flex" flexDir="column" gap="2">
                      <Input variant="outline" autoFocus name="text" placeholder="Search Lists" />
                      <CheckboxGroup colorScheme="purple" defaultValue={["watchlist"]}>
                        <Flex direction="column" gap="2">
                          <Checkbox value="watchlist">Watchlist</Checkbox>
                          <Checkbox value="other">Other</Checkbox>
                        </Flex>
                      </CheckboxGroup>
                    </Flex>
                  </Form>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
        <Grid templateColumns="400px 3fr" gap="5">
          <GridItem bg="gray.50">
            <Poster src={data?.movie.posters[0]} />
          </GridItem>
          <GridItem bg="gray.50" position="relative">
            <Backdrop src={data?.movie.backdrops[0]} />
            <Button
              position="absolute"
              bottom={5}
              right={5}
              variant="tertiary"
              size="lg"
              onClick={onGalleryOpen}
            >
              <Icon as={FiImage} />
              View all photos
            </Button>
          </GridItem>
        </Grid>
        <Grid templateColumns="3fr 1fr" gap="5">
          <Flex flexDir="column" gap="10">
            <Card variant="secondary" size="sm">
              <Tag title="Runtime" icon={FiClock}>
                {minuteToHour(data?.movie.runtime ?? 0)}
              </Tag>
              <Tag title="Release Date" icon={FiCalendar}>
                04/09/2013
              </Tag>
              <Tag title="Age Rating" icon={FiUser}>
                {data?.movie.age_rating ?? "N/A"}
              </Tag>
              <Tag title="User Score" icon={FiStar}>
                {data?.movie.rating._avg?.value ?? 0}%
              </Tag>
              <Tag title="Language" icon={HiLanguage}>
                {/* {data?.movie.langauge ?? "N/A"} */}
                N/A
              </Tag>
              <Tag title="Status" icon={FiCheckCircle}>
                {data?.movie.status ?? "Unknown"}
              </Tag>
            </Card>
            <Flex flexDirection="column" gap="4">
              <Heading as="h3" fontSize="2xl" fontWeight={700} color="brand.100">
                Overview
              </Heading>
              <Text variant="2" size="md">
                {data?.movie.title ?? "skeleton paragraph"}
              </Text>
            </Flex>
            <Flex flexDirection="column" gap="4">
              <Heading as="h4" fontSize="md" fontWeight={700} color="brand.100">
                Richard Curtis
              </Heading>
              <Text variant="2" size="md">
                Director, Writer
              </Text>
            </Flex>
            <Flex flexDirection="column" gap="4">
              <Flex justify="space-between" align="center">
                <Heading as="h3" fontSize="2xl" fontWeight={700} color="brand.100">
                  Cast
                </Heading>
                <Link href="#" size="sm">
                  Full Cast & Crew
                </Link>
              </Flex>
              <Grid templateColumns={["repeat(1, 1fr)", "repeat(7, 1fr)"]} gap="5">
                {[
                  {
                    name: "Domhnall Gleeson",
                    character: "Time Lake",
                    image:
                      "https://www.themoviedb.org/t/p/w138_and_h175_face/uDbwncuKlqL0fAuucXSvgakJDrc.jpg",
                  },
                  {
                    name: "Rachel McAdams",
                    character: "Mary",
                    image:
                      "https://www.themoviedb.org/t/p/w138_and_h175_face/w6s52XJ10YjiroduLL8jMr0rbzj.jpg",
                  },
                  {
                    name: "Bill Nighy",
                    character: "Dad",
                    image:
                      "https://www.themoviedb.org/t/p/w138_and_h175_face/acbigDOU1L1vMWAL3Wf0r8h8qLA.jpg",
                  },
                  {
                    name: "Tom Hollander",
                    character: "Harry",
                    image:
                      "https://www.themoviedb.org/t/p/w138_and_h175_face/cqZiJsImFZ6TaeShRRg49AZ9TyT.jpg",
                  },

                  {
                    name: "Margot Robbie",
                    character: "Charlotte",
                    image:
                      "https://www.themoviedb.org/t/p/w138_and_h175_face/euDPyqLnuwaWMHajcU3oZ9uZezR.jpg",
                  },

                  {
                    name: "Lydia Wilson",
                    character: "Harry",
                    image:
                      "https://www.themoviedb.org/t/p/w138_and_h175_face/yjuJDZxNJjgX0RueQ5eY6GWhTKX.jpg",
                  },

                  {
                    name: "Lindsay Duncan",
                    character: "Mum",
                    image:
                      "https://www.themoviedb.org/t/p/w138_and_h175_face/v91oNKrP713n5NQI4dg6LY425Pr.jpg",
                  },
                ].map((item) => (
                  <Flex key={item.name} flexDir="column" gap={2}>
                    <AspectRatio maxW="32" ratio={3 / 4}>
                      <Poster src={item.image} />
                    </AspectRatio>
                    <Flex flexDir="column">
                      <Text variant="5" size="sm">
                        {item.name}
                      </Text>
                      <Text variant="2" size="sm">
                        {item.character}
                      </Text>
                    </Flex>
                  </Flex>
                ))}
              </Grid>
            </Flex>
            <Flex flexDirection="column" gap="4">
              <Flex justify="space-between" align="center">
                <Heading as="h3" fontSize="2xl" fontWeight={700} color="brand.100">
                  Reviews
                </Heading>
                <Link href="#" size="sm">
                  All Reviews
                </Link>
              </Flex>
              <Card variant="primary">
                <Flex flexDir="column" gap="8" w="full">
                  <Text variant="1" size="md">
                    The night after another unsatisfactory New Year's party, Tim's father tells his son that
                    the men in his family have always had the ability to travel through time. They can't
                    change history, but they can change what happens and has happened in their own lives. Thus
                    begins the start of a lesson in learning to appreciate life itself as it is, as it comes,
                    and most importantly, the people living alongside us...
                  </Text>
                  <Flex align="flex-end" justify="space-between">
                    <Flex align="center" gap="4">
                      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                      <Flex flexDir="column">
                        <Text variant="4" size="md">
                          Diana Richards
                        </Text>
                        <Text variant="1" size="sm">
                          Rich Capital Properties LLC
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex align="center" gap="4">
                      <Button variant="secondary">Leave a comment</Button>
                      <Button variant="secondary">Read more</Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </Flex>
            <Flex flexDirection="column" gap="4">
              <Heading as="h3" fontSize="2xl" fontWeight={700} color="brand.100">
                Recommendations
              </Heading>
              <Grid gridTemplateColumns="repeat(5, 1fr)" gap="5">
                {[
                  {
                    name: "The Notebook",
                    match: 79,
                    image:
                      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
                  },
                  {
                    name: "The Perks of Being a Wallflower",
                    match: 78,
                    image:
                      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aKCvdFFF5n80P2VdS7d8YBwbCjh.jpg",
                  },
                  {
                    name: "(500) Days of Summer",
                    match: 73,
                    image:
                      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/f9mbM0YMLpYemcWx6o2WeiYQLDP.jpg",
                  },
                  {
                    name: "Begin Again",
                    match: 73,
                    image:
                      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qx4HXHXt528hS4rwePZbZo20xqZ.jpg",
                  },
                  {
                    name: "The vow",
                    match: 72,
                    image:
                      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qHNjcjKa6VHJsa0Eu0DHl2BaYw3.jpg",
                  },
                ].map((movie) => (
                  <Poster key={movie.name} src={movie.image} />
                ))}
              </Grid>
            </Flex>
          </Flex>
          <Flex flexDir="column" gap="8">
            <Flex
              borderRadius="md"
              borderWidth="thin"
              borderColor="purple.400"
              p="4"
              flexDir="column"
              align="start"
              w="full"
            >
              <Flex flexDir="column" gap="6" w="full">
                <Button width="full" variant="primary" size="lg">
                  <Icon as={FiPlay} />
                  Play Trailer
                </Button>
                <Divider />

                <Grid gridTemplateColumns="1fr 1fr" gap="4">
                  <Tag title="Popularity" icon={FiBarChart2}>
                    {data?.movie.popularity ?? 0}%
                  </Tag>
                  <Tag title="Content Score" icon={FiTrendingUp}>
                    100%
                  </Tag>
                  <Tag title="Budget">$12,000,000.00</Tag>
                  <Tag title="Revenue">$87,100,499.00</Tag>
                </Grid>
                <Divider />
                <Text variant="4" size="lg">
                  Genres
                </Text>
                <Grid gridTemplateColumns="1fr 1fr" gap="4">
                  {data?.movie.genres.map(genre => (
                    <LinkButton key={genre.name} href="#" variant="card" size="xl">
                      {genre.name}
                    </LinkButton>
                  ))}
                </Grid>
                <Divider />
                <Text variant="4" size="lg">
                  Keywords
                </Text>
                <Flex wrap="wrap" gap="4">
                  {data?.movie.keywords.map((keyword) => (
                    <LinkButton key={keyword.name} href="#" variant="card" size="xs">
                      {keyword.name}
                    </LinkButton>
                  ))}
                </Flex>
                <Divider />
                <Grid gridTemplateColumns="1fr 1fr" gap="4">
                  <Button variant="secondary" onClick={onReportOpen}>
                    <Icon as={FiAlertTriangle} />
                    Report Issue
                  </Button>
                  <LinkButton href="movie/edit" variant="secondary">
                    <Icon as={FiEdit} />
                    Edit Page
                  </LinkButton>
                </Grid>
              </Flex>
            </Flex>
          </Flex>
        </Grid>
      </Flex>
      <Modal isCentered isOpen={isReportOpen} onClose={onReportClose} size="2xl">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Report an Issue</ModalHeader>
          <ModalBody>
            <Form {...issueForm}>
              <Flex display="flex" flexDir="column" gap="5">
                <Select
                  name="problem"
                  label="Type of Problem"
                  options={[
                    { label: "Duplicate", value: "" },
                    { label: "Design or Functionality Issue", value: "" },
                    { label: "Incorrect Content", value: "" },
                    { label: "Bad Image", value: "" },
                    { label: "Offensive or Spam", value: "" },
                  ]}
                />
                <Textarea variant="outline" autoFocus name="details" label="Extra Details" />
                <Flex direction="column" gap="2">
                  <Text as="span" fontSize="14px" fontWeight={500}>
                    Public Report?
                  </Text>
                  <RadioGroup defaultValue="1" colorScheme="purple">
                    <Flex gap="2">
                      <Radio value="1">Yes</Radio>
                      <Radio value="2">No</Radio>
                    </Flex>
                  </RadioGroup>
                </Flex>
              </Flex>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={onReportClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isCentered isOpen={isGalleryOpen} onClose={onGalleryClose} size="4xl">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalBody>
            <Flex py={5} gap={5}>
              <Tabs index={tabIndex}>
                <TabPanels>
                  <TabPanel>
                    <AspectRatio minWidth="400px" ratio={3 / 5}>
                      <Poster src="https://www.themoviedb.org/t/p/original/iR1bVfURbN7r1C46WHFbwCkVve.jpg" />
                    </AspectRatio>
                  </TabPanel>
                  <TabPanel>
                    <AspectRatio minWidth="400px" ratio={16 / 9}>
                      <Backdrop src="https://www.themoviedb.org/t/p/original/rc1IUET1dg6GUAwyhcjBIpZtzGW.jpg" />
                    </AspectRatio>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              {/* { backdrop: "" }, */}
              <Flex direction="column" width="full">
                <Text>Owner: You</Text>
                <Text>Owner: You</Text>
                <Text>Owner: You</Text>
                <Text>Owner: You</Text>
                <Text>Owner: You</Text>
                <Text>Owner: You</Text>
                <Text>Owner: You</Text>
                <Text>Owner: You</Text>
                <Text>Owner: You</Text>

                <Flex justify="space-between" align="flex-end" h="full">
                  <Button variant="secondary" onClick={prevTab}>
                    Prev
                  </Button>
                  <Button variant="primary" onClick={nextTab}>
                    Next
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

Movie.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
