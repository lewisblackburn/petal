import { Box, RadioProps, useRadio } from "@chakra-ui/react"

export function RadioCard(props: RadioProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="10"
        width="156px"
        paddingLeft="16px"
        paddingRight="16px"
        paddingTop="14px"
        paddingBottom="14px"
        borderRadius=" 8px"
        borderWidth="1.5px"
        borderColor="purple.400"
        fontWeight={500}
        color="brand.100"
        fontSize="14px"
        _checked={{
          fontWeight: 700,
          borderColor: "brand.200",
          background: "purple.300",
          color: "brand.200",
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}
