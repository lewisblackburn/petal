import NextLink from "next/link"
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react"

const Link: React.FC<ChakraLinkProps> = ({ href = "", ...props }) => {
  return (
    <NextLink href={href} legacyBehavior passHref>
      <ChakraLink width="fit-content" size="md" {...props}>
        {props.children}
      </ChakraLink>
    </NextLink>
  )
}

export default Link
