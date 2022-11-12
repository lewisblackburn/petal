import * as React from "react"

import { HomeLink } from "./Nav"
import Head from "next/head"
import { Box, Button, Icon, useColorModeValue, Flex, Grid } from "@chakra-ui/react"
import { FiChevronLeft } from "react-icons/fi"
import { useRouter } from "next/router"

interface Props {
  children: React.ReactNode
}

export function DefaultLayout(props: Props) {
  const router = useRouter()
  return (
    <Box w="100%">
      <Head>
        <title>Boilerplate</title>
      </Head>

      <Grid
        w="100%"
        pos="fixed"
        top={0}
        left={0}
        borderBottom="1px solid"
        bg={useColorModeValue("white", "gray.800")}
        transition="200ms all"
        borderColor={useColorModeValue("gray.100", "gray.700")}
        height="24"
        px={8}
        alignItems="center"
        gridTemplateColumns="1fr 1fr 1fr"
        zIndex={500}
      >
        <Button variant="transparent" justifySelf="flex-start" onClick={() => router.back()}>
          <Icon as={FiChevronLeft} />
          Back
        </Button>
        <HomeLink
          justifySelf="center"
          href="/"
          color="gray.900"
          _hover={{ color: "gray.600" }}
          fontWeight="bold"
        >
          petal
        </HomeLink>
      </Grid>

      <Box w="100%" mt={24} py={20}>
        {props.children}
      </Box>
    </Box>
  )
}
