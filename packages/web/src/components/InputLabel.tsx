import * as React from "react"
import { FormLabel, FormLabelProps, Text, useColorModeValue } from "@chakra-ui/react"

interface Props extends Omit<FormLabelProps, "children"> {
  name?: string
  label?: string
  subLabel?: string
}

export const InputLabel: React.FC<Props> = ({ subLabel, ...props }) => {
  const subLabelColor = useColorModeValue("brand.100", "brand.100")
  if (!props.label) return null

  return (
    <FormLabel htmlFor={props.name} {...props} fontSize="sm" mb="2">
      {props.label}
      {subLabel && (
        <Text ml={2} as="span" fontSize="14px" fontWeight={500} color={subLabelColor}>
          {subLabel}
        </Text>
      )}
    </FormLabel>
  )
}
