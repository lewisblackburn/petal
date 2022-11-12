const baseFieldStyle = {
  field: {
    borderRadius: 6,
    paddingX: 4,
    paddingY: 6,
    fontWeight: 500,
    fontSize: "md",
    alignSelf: "stretch",
    flexGrow: 1,
    borderWidth: 1,
  },
}

export const Input = {
  parts: ["field", "addon"],
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {
    lg: baseFieldStyle,
    md: baseFieldStyle,
    sm: baseFieldStyle,
    xs: baseFieldStyle,
  },
  variants: {
    filled: () => ({
      field: {
        backgroundColor: "purple.100",
        color: "brand.100",
        borderColor: "purple.400",
        _hover: {
          backgroundColor: "purple.200",
        },
        _focus: {
          backgroundColor: "purple.200",
        },
      },
    }),
    outline: () => ({
      field: {
        backgroundColor: "white",
        color: "brand.100",
        borderColor: "purple.400",
      },
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: "outline",
    focusBorderColor: "purple.500",
  },
}
