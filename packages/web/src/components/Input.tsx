import * as React from "react"
import { useFormContext } from "react-hook-form"
import type { InputProps } from "@chakra-ui/react"
import { FormControl, Input as CInput } from "@chakra-ui/react"

import { InputError } from "./InputError"
import { InputLabel } from "./InputLabel"

interface Props extends InputProps {
  name: string
  label?: string
  subLabel?: string
}

export const Input = ({ label, subLabel, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[props.name]
  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <InputLabel label={label} subLabel={subLabel} name={props.name} />
      <CInput
        {...register(props.name)}
        mb={0}
        alignSelf="stretch"
        flexGrow={1}
        paddingX="16px"
        paddingY="12px"
        borderRadius="8px"
        gap="10px"
        background="purple.100"
        borderWidth={1}
        borderColor="purple.400"
        fontSize="16px"
        fontWeight={500}
        color="brand.100"
        {...props}
      />

      <InputError error={fieldError} />
    </FormControl>
  )
}
