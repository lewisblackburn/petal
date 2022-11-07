export const Button = {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    color: "white",
  },
  sizes: {
    md: {
      gap: "6px",
      paddingX: "24px",
      paddingY: "12px",
      fontWeight: 600,
      fontSize: 14,
    },
    lg: {
      gap: "8px",
      paddingX: "24px",
      paddingY: "16px",
      fontWeight: 700,
      fontSize: 14,
    },
  },
  variants: {
    primary: () => ({
      backgroundColor: "brand.200",
      color: "white",
    }),
    secondary: () => ({
      backgroundColor: "purple.100",
      borderWidth: "1.5px",
      borderColor: "purple.400",
      color: "brand.200",
    }),
    tertiary: () => ({
      backgroundColor: "white",
      borderWidth: "2px",
      color: "brand.100",
      borderColor: "purple.400",
    }),
    transparent: () => ({
      color: "black",
    }),
  },
  defaultProps: {
    size: "lg",
  },
}
