import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useContext, useEffect } from "react";
import { TokenContext } from "../../core/contexts/token-context";
import { pagesUrl } from "../../core/appConstants";
import { Navigate } from "react-router-dom";
import { useOrganization } from "../../core/hooks/use-organization";
import { OrganizationContext } from "../../core/contexts/organization-context";
export default function RequireAuth({ children, }) {
    const { isAuthenticated } = useContext(TokenContext);
    const { organization, setOrganization } = useContext(OrganizationContext);
    const { fetchOrganization } = useOrganization();
    const saveOrganization = useCallback(async () => {
        const response = await fetchOrganization();
        setOrganization(response);
    }, [fetchOrganization, setOrganization]);
    useEffect(() => {
        if (isAuthenticated && organization === undefined) {
            saveOrganization();
        }
    }, [isAuthenticated, organization, saveOrganization]);
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: pagesUrl.SIGN_IN_PAGE, replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
