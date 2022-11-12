import * as React from "react"
import { Image } from "@chakra-ui/react"

interface Props {
  src?: string
}

export const Poster = ({ src }: Props) => {
  return (
    <Image
      width="full"
      height="full"
      borderRadius="lg"
      src={src}
      fallbackSrc="https://via.placeholder.com/800x1200"
    />
  )
}
