import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Container, Grid2 } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.webp";
import { useCallback, useContext, useState } from "react";
import { TokenContext } from "../../core/contexts/token-context";
import { UserContext } from "../../core/contexts/user-context";
import { theme } from "../../styles/theme";
import TitleH1 from "../typographies/TitleH1";
import { pagesUrl } from "../../core/appConstants";
import NavigationButton from "../buttons/NavigationButton";
export default function Header() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(TokenContext);
    const { logoutUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const handleLogout = useCallback(async () => {
        setIsLoading(true);
        await logoutUser();
        setIsLoading(false);
        navigate(pagesUrl.HOME_PAGE);
    }, [logoutUser, navigate]);
    return (_jsxs(Container, { maxWidth: "xl", sx: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingY: 1,
            backgroundColor: theme.palette.background.paper,
            border: "solid",
            borderColor: theme.palette.primary.main,
            borderRadius: "5px",
            boxShadow: "0px 10px 12px rgba(0, 0, 0, 0.5)",
            position: "sticky",
            top: 0,
            zIndex: 1000,
        }, children: [_jsxs(Box, { sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }, children: [_jsx(Link, { to: isAuthenticated ? pagesUrl.DASHBOARD_PAGE : "/", children: _jsx("img", { style: {
                                width: 40,
                                borderRadius: "50%",
                                boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.5)",
                            }, src: Logo, alt: "Logo de Simple DPGF" }) }), _jsx(TitleH1, { children: "Simple DPGF" })] }), isAuthenticated ? (_jsx(Grid2, { size: 6, children: _jsx(NavigationButton, { label: "D\u00E9connexion", onClick: handleLogout, loading: isLoading }) })) : (_jsxs(Grid2, { container: true, spacing: 2, children: [_jsx(Grid2, { size: 6, children: _jsx(NavigationButton, { label: "Inscription", path: pagesUrl.SIGN_UP_PAGE }) }), _jsx(Grid2, { size: 6, children: _jsx(NavigationButton, { label: "Connexion", path: pagesUrl.SIGN_IN_PAGE }) })] }))] }));
}
