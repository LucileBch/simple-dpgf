//import "./App.css";

// utils imports
import { CssBaseline, ThemeProvider } from "@mui/material";
import AppRouter from "./app/router/AppRouter";
import { theme } from "./app/styles/theme";
import { TokenContextProvider } from "./app/core/contexts/token-context";
import { UserContextProvider } from "./app/core/contexts/user-context";
import { AlertContextProvider } from "./app/core/contexts/alert-context";

export default function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertContextProvider>
          <TokenContextProvider>
            <UserContextProvider>
              <AppRouter />
            </UserContextProvider>
          </TokenContextProvider>
        </AlertContextProvider>
      </ThemeProvider>
    </>
  );
}
