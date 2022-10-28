export const Button = {
  baseStyle: {
    borderRadius: 4,
    color: "white",
  },
  sizes: {
    sm: {
      minWidth: 16,
      height: 8,
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 600,
    },
    lg: {
      minWidth: 16,
      height: 10,
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 700,
    },
  },
  variants: {
    outline: () => ({}),
    solid: () => ({
      bg: "purple.300",
      color: "brand.200",
      _hover: {
        bg: "purple.500",
      },
    }),
    transparent: () => ({
      bg: "transparent",
      color: "black",
      _hover: {
        bg: "purple.100",
        color: "brand.200",
      },
    }),
  },
  defaultProps: {
    size: "lg",
  },
}
