const baseFieldStyle = { field: { borderRadius: 6 } }

export const Select = {
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
        bg: "white",
        color: "gray.500",
        borderColor: "purple.500",
        _hover: {
          bg: "white",
        },
      },
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: "filled",
    focusBorderColor: "purple.500",
  },
}
