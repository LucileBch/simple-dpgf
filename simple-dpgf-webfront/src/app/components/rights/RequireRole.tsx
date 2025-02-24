import React, { ReactNode, useContext, useEffect } from "react";
import { RoleEnum } from "../../core/enums/RoleEnum";
import { UserContext } from "../../core/contexts/user-context";
import { AlertContext } from "../../core/contexts/alert-context";
import { useNavigate } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";

interface IProps {
  children: ReactNode;
  allowedRole: RoleEnum;
}

export default function RequireRole({
  children,
  allowedRole: allowedRole,
}: Readonly<IProps>): React.JSX.Element | null {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { setAlertMessage, setOpenAlert, setSeverity } =
    useContext(AlertContext);

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

  return hasPermission ? <>{children}</> : null;
}
