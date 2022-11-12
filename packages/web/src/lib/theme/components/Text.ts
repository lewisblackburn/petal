export const Text = {
  baseStyle: {},
  sizes: {
    sm: {
      fontSize: "sm",
    },
    md: {
      fontSize: "md",
    },
    lg: {
      fontSize: "lg",
    },
    xl: {
      fontSize: "xl",
    },
    "2xl": {
      fontSize: "2xl",
    },
  },
  variants: {
    1: () => ({
      opacity: 0.5,
      fontWeight: 500,
      color: "brand.100",
    }),
    2: () => ({
      opacity: 0.7,
      fontWeight: 500,
      color: "brand.100",
    }),
    3: () => ({
      fontWeight: 500,
      color: "brand.200",
    }),
    4: () => ({
      fontWeight: 700,
      color: "brand.100",
    }),
    5: () => ({
      fontWeight: 600,
      color: "brand.100",
    }),

    6: () => ({
      fontWeight: 600,
      color: "brand.200",
    }),
  },
  defaultProps: {},
}
