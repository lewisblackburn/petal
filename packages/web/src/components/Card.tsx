import { useStyleConfig, Flex } from "@chakra-ui/react"

function Card(props: any) {
  const { size, variant, ...rest } = props
  const styles = useStyleConfig("Card", { size, variant })
  return <Flex sx={styles} {...rest} />
}

export default Card
