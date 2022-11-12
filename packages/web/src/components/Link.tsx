import NextLink, { type LinkProps as NextLinkProps } from "next/link"
// import { chakra } from "@chakra-ui/react"
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react"

// const Link = chakra<typeof NextLink, NextLinkProps>(NextLink, {
//   // ensure that you're forwarding all of the required props for your case
//   shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
// })

const Link: React.FC<React.PropsWithChildren<ChakraLinkProps>> = ({ href = "", ...props }) => {
  return (
    <NextLink href={href} legacyBehavior passHref>
      <ChakraLink width="fit-content" size="md" {...props}>
        {props.children}
      </ChakraLink>
    </NextLink>
  )
}

export default Link
