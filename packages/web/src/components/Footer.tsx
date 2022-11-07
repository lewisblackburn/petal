import * as React from "react"
import { Box, Text } from "@chakra-ui/layout"
import { useColorModeValue } from "@chakra-ui/react"

export function Footer() {
  return (
    <Box
      w="100%"
      bottom={0}
      left={0}
      borderTop="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      zIndex={500}
    >
      <Text color="gray.500">©2022 Petal. All rights reserved</Text>
    </Box>
  )
}
