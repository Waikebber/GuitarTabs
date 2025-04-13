import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "gray.800",
        color: "white",
      },
    },
  },
  colors: {
    blue: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue",
      },
      variants: {
        solid: {
          bg: "blue.500",
          color: "white",
          _hover: {
            bg: "blue.700",
          },
        },
        ghost: {
          _hover: {
            bg: "whiteAlpha.200",
          },
        },
      },
    },
    IconButton: {
      defaultProps: {
        colorScheme: "blue",
      },
      variants: {
        solid: {
          bg: "blue.500",
          color: "white",
          _hover: {
            bg: "blue.700",
          },
        },
        ghost: {
          _hover: {
            bg: "whiteAlpha.200",
          },
        },
      },
    },
  },
});
