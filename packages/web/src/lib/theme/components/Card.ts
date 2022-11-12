export const Card = {
  baseStyle: {
    p: 8,
    alignItems: "center",
    borderRadius: "md",
    borderWidth: "thin",
    justifyContent: "space-between",
  },
  variants: {
    primary: () => ({
      backgroundColor: "purple.100",
      borderColor: "purple.400",
    }),
    secondary: () => ({
      borderColor: "purple.200",
    }),
  },
  defaultProps: {},
}
