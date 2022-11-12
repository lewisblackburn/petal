import * as React from "react"
import { Box, Container, HStack } from "@chakra-ui/layout"

import { HomeLink } from "./Nav"
import Head from "next/head"
import { useColorModeValue } from "@chakra-ui/react"

interface Props {
  children: React.ReactNode
}

export function AuthLayout(props: Props) {
  return (
    <Box>
      <Head>
        <title>Boilerplate</title>
      </Head>

      <Box
        w="100%"
        pos="fixed"
        top={0}
        left={0}
        borderBottom="1px solid"
        borderColor={useColorModeValue("gray.100", "gray.700")}
        zIndex={500}
      >
        <Container
          maxW="8xl"
          display="flex"
          transition="200ms all"
          py={{ base: 4, md: 3 }}
          bg={useColorModeValue("white", "gray.800")}
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          {/* Left link list */}

          <HStack>
            <HomeLink href="/" color="gray.900" _hover={{ color: "gray.600" }} pl={0} fontWeight="bold">
              petal
            </HomeLink>
          </HStack>
        </Container>
      </Box>

      <Container maxW="8xl" py={20} h="calc(100vh - 65px)">
        {props.children}
      </Container>
    </Box>
  )
}
