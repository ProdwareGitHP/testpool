import { createTheme } from "@mui/material/styles";

const evoTheme = createTheme({
  palette: {
    primary: {
      main: "#124590",
      lighter: "#E3EFFF",
    },
    secondary: {
      main: "#FFFFFF",
    },
    default: {
      main: "rgba(0, 0, 0, 0.87)",
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          // color: "red",
          fontSize: "14px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // color: "red",
          fontWeight: "normal",
          fontSize: "14px",
        },
      },
    },
  },
});

export default evoTheme;
