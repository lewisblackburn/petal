import * as React from "react"
import { Flex, Box, Text, Container } from "@chakra-ui/layout"
import { Icon, useColorModeValue } from "@chakra-ui/react"
import { FiGithub, FiInstagram, FiTwitter } from "react-icons/fi"

export function Footer() {
  return (
    <Box w="100%" borderTop="1px solid" borderColor={useColorModeValue("gray.100", "gray.700")} zIndex={500}>
      <Container
        maxW="8xl"
        display="flex"
        transition="200ms all"
        height="24"
        bg={useColorModeValue("white", "gray.800")}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <Text color="gray.500">©2022 Petal. All rights reserved</Text>
        <Flex gap="40px">
          <Icon as={FiInstagram} />
          <Icon as={FiTwitter} />
          <Icon as={FiGithub} />
        </Flex>
      </Container>
    </Box>
  )
}
