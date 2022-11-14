import { Flex, Text, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"

interface Props {
  title: string
  icon?: IconType
}
const Tag: React.FC<React.PropsWithChildren<Props>> = ({ title, icon, children }) => {
  return (
    <Flex flexDir="column" gap="1">
      <Text variant="1" size="md">
        {title}
      </Text>
      <Flex gap="2" align="center">
        {icon && <Icon as={icon} />}
        <Text>{children}</Text>
      </Flex>
    </Flex>
  )
}
export default Tag
