const baseStyle = {
  field: {
    borderRadius: 6,
    height: 12,
    fontWeight: 500,
    fontSize: "md",
    alignSelf: "stretch",
    flexGrow: 1,
    borderWidth: 1,
  },
}

export const Textarea = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {
    lg: baseStyle,
    md: baseStyle,
    sm: baseStyle,
    xs: baseStyle,
  },
  variants: {
    filled: () => ({
      backgroundColor: "purple.100",
      color: "brand.100",
      borderColor: "purple.400",
      _hover: {
        backgroundColor: "purple.200",
      },
      _focus: {
        backgroundColor: "purple.200",
      },
    }),
    outline: () => ({
      backgroundColor: "white",
      color: "brand.100",
      borderColor: "purple.400",
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: "outline",
    focusBorderColor: "purple.500",
  },
}
