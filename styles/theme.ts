import { extendTheme } from "@chakra-ui/react";

import {
  Button,
  FloatingLabel,
  FormError,
  FormLabel,
  Input,
  Select,
} from "./components";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "background",
        color: "gray.100",
      },
    },
  },
  fonts: {
    body: "Quicksand, sans-serif",
    heading: "Quicksand, sans-serif",
  },
  fontSizes: {
    xss: "0.5rem",
  },
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    text: "#13223E",
    text70: "#13223EB2",
    gray: {
      100: "#F0F0F0",
      300: "#DADADA",
      400: "#C2C2C2",
      500: "#8C8C8C",
      600: "#7e7e7e",
      700: "#707070",
    },
    primary: {
      50: "#feb1a2",
      100: "#fea18f",
      300: "#FC8472",
      400: "#FC6E58",
      500: "#FD6244",
      700: "#e4583d",
      800: "#ca4e36",
    },
    secondary: {
      50: "#999999",
      100: "#858585",
      300: "#5c5c5c",
      400: "#474747",
      500: "#333333",
      600: "#2e2e2e",
      700: "#292929",
      800: "#242424",
    },
    buttonBlack: {
      300: "#717171",
      400: "#5f5f5f",
      500: "#4d4d4d",
      600: "#454545",
      700: "#3e3e3e",
    },
    input: "#4C4C4C",
    inputHover: "#4D4D4D",
    success: "#00B307",
    error: {
      50: "rgba(229, 72, 72, .15)",
      100: "rgba(229, 72, 72, .25)",
      300: "#fd5939",
      400: "#fd4421",
      500: "#FD2F08",
      600: "#e42a07",
      700: "#ca2606",
    },
    alert: "#ED6B22",
    yellow: "#F9A82F",
    background: "#333333",
    background2: "#8C8C8C",
    background3: "#4C4C4C",
    backgroudLight: "#ffffff",
  },
  shadows: {
    outline: "none",
  },
  components: {
    Button,
    Input,
    Select,
    FormLabel,
    FormError,
    Form: {
      ...FloatingLabel,
    },
  },
});
