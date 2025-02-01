import { createTheme } from "@mui/material/styles";
import "@fontsource/pt-serif";
import "@fontsource/roboto-condensed";

export const theme = createTheme({
  // Customize typography
  typography: {
    h1: {
      fontFamily: "'PT Serif',Roboto, sans-serif",
      fontWeight: 600,
      fontSize: "24px",
    },
    h2: {
      fontFamily: "'PT Serif',Roboto, sans-serif",
      fontWeight: 600,
      fontSize: "20px",
    },
    h3: {
      fontFamily: "'PT Serif',Roboto, sans-serif",
      fontWeight: "bold",
      fontSize: "16px",
    },
    body1: {
      fontFamily: "'Roboto Condensed', Arial, sans-serif",
      fontWeight: 400,
      fontSize: "13px",
    },
  },

  // Customize color palette
  palette: {
    primary: {
      main: "#0d5c63",
    },
    secondary: {
      main: "#44a1a0",
    },
    text: {
      primary: "#000000",
      secondary: "#0d5c63",
    },
    error: {
      main: "#A30015",
    },
    success: {
      main: "#104911",
    },
    background: {
      default: "#ffffff",
      paper: "#dfe3e8",
    },
  },

  // customize components
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Roboto Condensed', Arial, sans-serif",
          fontWeight: 600,
          color: "fffffa",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: "#ffffff", // Couleur de fond de l'input
          },
        },
      },
    },
  },
});
