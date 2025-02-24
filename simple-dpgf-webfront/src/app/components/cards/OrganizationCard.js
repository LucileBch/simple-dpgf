import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { AdminOrganizationContext } from "../../core/contexts/admin-organization-context";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";
import { resolveUrl } from "../../core/services/http-service";
import TitleH3 from "../typographies/TitleH3";
export default function OrganizationCard({ organization, }) {
    const navigate = useNavigate();
    const { setOrganization } = useContext(AdminOrganizationContext);
    function navigateToOrganization() {
        if (organization.id !== undefined) {
            setOrganization(organization);
            navigate(resolveUrl(pagesUrl.ADMIN_ORGANIZATION_PAGE, [organization.id]));
        }
        else {
            console.log("aucune orga");
        }
    }
    return (_jsx(Card, { sx: {
            maxWidth: 275,
            minHeight: 200,
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
                transform: "translateZ(10px)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 042)",
            },
        }, children: _jsxs(CardContent, { onClick: navigateToOrganization, children: [_jsx(TitleH3, { children: organization.name }), _jsxs(Typography, { children: ["Type d'organisation : ", organization.organizationType] }), _jsxs(Typography, { children: ["Nombre de licenses utilisateur : ", organization.memberLicenseCounter, " /", " ", organization.maxMemberLicenseCounter] }), _jsxs(Typography, { children: ["Nombre de licenses projet : ", organization.projectLicenseCounter, " /", " ", organization.maxProjectLicenseCounter] })] }) }));
}
