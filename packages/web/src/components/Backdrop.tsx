import * as React from "react"
import { Image } from "@chakra-ui/react"

interface Props {
  src?: string
}

export const Backdrop = ({ src }: Props) => {
  return (
    <Image
      width="full"
      height="full"
      borderRadius="lg"
      src={src}
      fallbackSrc="https://via.placeholder.com/2000x1200"
    />
  )
}
