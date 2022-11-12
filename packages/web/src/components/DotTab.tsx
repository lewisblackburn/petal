import { Box, Button, Flex, Grid, Text, useTab } from "@chakra-ui/react"
import React from "react"

const DotTab: any = React.forwardRef((props, ref) => {
  // @ts-ignore
  const tabProps = useTab({ ...props, ref })
  const isSelected = !!tabProps["aria-selected"]
  const index = parseInt(tabProps["id"][tabProps["id"].length - 1]) + 1

  return (
    <Button variant="transparent" {...tabProps}>
      <Flex align="center" gap="4">
        <Grid
          placeItems="center"
          width="24px"
          height="24px"
          borderRadius="full"
          backgroundColor={isSelected ? "brand.200" : "purple.200"}
        >
          <Text
            fontSize="12px"
            fontWeight={isSelected ? 700 : 500}
            textAlign="center"
            color={isSelected ? "white" : "brand.200"}
          >
            {index}
          </Text>
        </Grid>
        <Text color="brand.100" fontSize="16px" fontWeight="500">
          {tabProps.children}
        </Text>
      </Flex>
    </Button>
  )
})

export default DotTab
