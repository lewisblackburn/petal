import { extendTheme } from "@chakra-ui/react"

import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { Input } from "./components/Input"
import { Link } from "./components/Link"
import { Menu } from "./components/Menu"
import { NumberInput } from "./components/NumberInput"
import { Select } from "./components/Select"
import { Text } from "./components/Text"
import { Textarea } from "./components/Textarea"
import { Tooltip } from "./components/Tooltip"

// font: 20px -> xl, 16px -> md, 14px -> sm
// space: 16px -> 4, 14px -> 3.5
// radii: 8px -> md, {8} -> lg

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
  },
  styles: {
    global: {
      "*": {
        scrollbarWidth: "none",
      },
    },
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
    Card,
    Input,
    Link,
    Menu,
    NumberInput,
    Select,
    Text,
    Textarea,
    Tooltip,
  },
})
