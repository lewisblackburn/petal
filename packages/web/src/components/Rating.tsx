import { Icon } from "@chakra-ui/react"
import { useState } from "react"
import { FiStar } from "react-icons/fi"

interface Props {
  selected: number
  setSelected: (index: number) => void
}

const Rating = ({ selected, setSelected }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [hovering, setHovering] = useState(false)

  return (
    <>
      {new Array(5).fill(0).map((_, index) => (
        <Icon
          key={index}
          as={FiStar}
          px="1"
          fontSize="2xl"
          onClick={() => {
            if (index == selected - 1) setSelected(-1)
            else setSelected(index + 1)
          }}
          onMouseOver={() => {
            setHovering(true)
            setHoveredIndex(index)
          }}
          onMouseLeave={() => {
            setHovering(false)
            setHoveredIndex(-1)
          }}
          color={(!hovering && index <= selected - 1) || index <= hoveredIndex ? "yellow.500" : "black"}
        />
      ))}
    </>
  )
}

export default Rating
