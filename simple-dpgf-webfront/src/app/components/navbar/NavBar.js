import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Container, Grid2 } from "@mui/material";
import NavigationButton from "../buttons/NavigationButton";
import { pagesUrl } from "../../core/appConstants";
import { useCallback, useContext } from "react";
import { UserContext } from "../../core/contexts/user-context";
import { RoleEnum } from "../../core/enums/RoleEnum";
import TitleH1 from "../typographies/TitleH1";
import { useNavigate } from "react-router-dom";
import { resolveUrl } from "../../core/services/http-service";
import { OrganizationContext } from "../../core/contexts/organization-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { theme } from "../../styles/theme";
export default function NavBar() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { organization } = useContext(OrganizationContext);
    const { handleErrorAlert } = useContext(AlertContext);
    const navigateToProfilePage = useCallback(() => {
        if (user !== undefined) {
            navigate(resolveUrl(pagesUrl.USER_PROFILE_PAGE, [user.id]));
        }
    }, [navigate, user]);
    const navigateToTeamPage = useCallback(() => {
        if (organization != undefined) {
            navigate(resolveUrl(pagesUrl.MOA_MANAGER_TEAM_PAGE, [organization.id]));
        }
        else {
            handleErrorAlert("Vous devez appartenir à une organisation valide");
        }
    }, [handleErrorAlert, navigate, organization]);
    return (_jsxs(Container, { maxWidth: "xl", sx: {
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid",
            borderColor: theme.palette.background.paper,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }, children: [_jsx(Box, { children: _jsx(TitleH1, { children: "Tableau de bord" }) }), _jsxs(Grid2, { container: true, spacing: 2, sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }, children: [user?.role === RoleEnum.ADMIN && (_jsx(_Fragment, { children: _jsx(Grid2, { children: _jsx(NavigationButton, { label: "Organisations", path: pagesUrl.ADMIN_ORGANIZATIONS_PAGE }) }) })), user?.role === RoleEnum.ORGANIZATION_MANAGER && (_jsxs(_Fragment, { children: [_jsx(Grid2, { children: _jsx(NavigationButton, { label: "Projets", path: pagesUrl.MOA_MANAGER_PROJECTS_PAGE }) }), _jsx(Grid2, { children: _jsx(NavigationButton, { label: "Equipe", onClick: navigateToTeamPage }) })] })), user?.role === RoleEnum.PROJECT_OWNER && (_jsx(Grid2, { children: _jsx(NavigationButton, { label: "Projets", path: pagesUrl.MOA_PROJECTS_PAGE }) })), _jsx(Grid2, { children: _jsx(NavigationButton, { label: "Mon profil", onClick: navigateToProfilePage }) })] })] }));
}
