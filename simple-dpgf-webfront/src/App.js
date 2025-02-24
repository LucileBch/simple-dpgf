import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
//import "./App.css";
// utils imports
import { CssBaseline, ThemeProvider } from "@mui/material";
import AppRouter from "./app/router/AppRouter";
import { theme } from "./app/styles/theme";
import { TokenContextProvider } from "./app/core/contexts/token-context";
import { UserContextProvider } from "./app/core/contexts/user-context";
import { AlertContextProvider } from "./app/core/contexts/alert-context";
export default function App() {
    return (_jsx(_Fragment, { children: _jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(AlertContextProvider, { children: _jsx(TokenContextProvider, { children: _jsx(UserContextProvider, { children: _jsx(AppRouter, {}) }) }) })] }) }));
}
