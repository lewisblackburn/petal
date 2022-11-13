import * as React from "react"
import { Box } from "@chakra-ui/react"

import { HomeLayout } from "components/HomeLayout"
import { useMe } from "lib/hooks/useMe"

export default function Home() {
  const { me } = useMe()
  console.log(me)

  return <Box></Box>
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
