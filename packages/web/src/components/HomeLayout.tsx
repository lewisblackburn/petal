import * as React from "react"
import { Box } from "@chakra-ui/layout"

import { Nav } from "./Nav"

interface Props {
  children: React.ReactNode
}

export function HomeLayout(props: Props) {
  return (
    <Box>
      <Nav />
      <Box pt="65px">{props.children}</Box>
    </Box>
  )
}
