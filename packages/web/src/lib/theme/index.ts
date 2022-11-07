import { extendTheme } from "@chakra-ui/react"

import { Button } from "./components/Button"
import { Input } from "./components/Input"
import { Select } from "./components/Select"
import { Textarea } from "./components/Textarea"

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
    "3xl": "130em",
    "4xl": "148em",
    "5xl": "160em",
    "6xl": "180em",
  },
  colors: {
    brand: {
      100: "#000929",
      200: "#7065F0",
      300: "#384046",
      400: "#FFFFFF",
    },
    purple: {
      100: "#F7F7FD",
      200: "#F0EFFB",
      300: "#E8E6F9",
      400: "#E0DEF7",
      500: "#D8D6F5",
    },
    gray: {
      50: "#F9FAFB",
      100: "#F4F4F6",
      200: "#E5E6EB",
      300: "#D3D5DA",
      400: "#9EA3AE",
      500: "#6C727F",
      600: "#4D5461",
      700: "#394150",
      800: "#212936",
      900: "#161D21",
    },
  },
  components: {
    Button,
    Input,
    Select,
    Textarea,
  },
})
