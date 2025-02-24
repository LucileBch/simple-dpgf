import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { UserContext } from "../../core/contexts/user-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";
export default function RequireRole({ children, allowedRole: allowedRole, }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { setAlertMessage, setOpenAlert, setSeverity } = useContext(AlertContext);
    const hasPermission = user ? allowedRole === user.role : false;
    useEffect(() => {
        if (!hasPermission) {
            setOpenAlert(true);
            setAlertMessage("Vous n'avez pas les permissions requises");
            setSeverity("error");
            navigate(pagesUrl.DASHBOARD_PAGE, { replace: true });
        }
    }, [
        user,
        allowedRole,
        setAlertMessage,
        setOpenAlert,
        setSeverity,
        hasPermission,
        navigate,
    ]);
    return hasPermission ? _jsx(_Fragment, { children: children }) : null;
}
