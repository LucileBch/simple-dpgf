//import "./App.css";

// utils imports
import { CssBaseline, ThemeProvider } from "@mui/material";
import AppRouter from "./app/router/AppRouter";
import { theme } from "./app/styles/theme";

export default function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </>
  );
}
