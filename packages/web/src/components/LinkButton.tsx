import * as React from "react"
import { Button, ButtonProps, Link as ChakraLink } from "@chakra-ui/react"
import NextLink from "next/link"

interface Props extends ButtonProps {
  href: string
}
export const LinkButton: React.FC<React.PropsWithChildren<Props>> = ({ href, ...props }) => {
  return (
    <NextLink href={href} legacyBehavior passHref>
      <Button as={ChakraLink} textDecor="none !important" {...props}>
        {props.children}
      </Button>
    </NextLink>
  )
}
