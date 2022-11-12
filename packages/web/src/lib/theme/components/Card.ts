export const Card = {
  baseStyle: {
    alignItems: "center",
    borderRadius: "md",
    borderWidth: "thin",
    justifyContent: "space-between",
  },
  sizes: {
    sm: {
      height: "115px",
    },
    lg: {},
  },
  variants: {
    primary: () => ({
      p: 8,
      backgroundColor: "purple.100",
      borderColor: "purple.400",
    }),
    secondary: () => ({
      px: 8,
      borderColor: "purple.200",
    }),
  },
  defaultProps: {},
}
