import { useContext, useEffect } from "react";
import { UserContext } from "../../core/contexts/user-context";
import { RoleEnum } from "../../core/enums/RoleEnum";
import { useLocation, useNavigate } from "react-router-dom";
import { pagesUrl } from "../../core/appConstants";
import {
  removeCookies,
  removeUserFromLocalStorage,
} from "../../core/services/authentication-service";
import { TokenContext } from "../../core/contexts/token-context";

export default function UserDashboard(): JSX.Element | null {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useContext(UserContext);
  const { setAccessToken, setRefreshToken, setIsAuthenticated } =
    useContext(TokenContext);

  useEffect(() => {
    if (!user) {
      navigate(pagesUrl.SIGN_IN_PAGE);
      return;
    }

    const roleBaseRedirection: Record<RoleEnum, string> = {
      [RoleEnum.ADMIN]: pagesUrl.ADMIN_ORGANIZATIONS_PAGE,
      [RoleEnum.ORGANIZATION_MANAGER]: pagesUrl.MOA_MANAGER_PROJECTS_PAGE,
      [RoleEnum.PROJECT_OWNER]: pagesUrl.MOA_DASHBOARD_PAGE,
    };

    const targetPage = roleBaseRedirection[user.role] ?? pagesUrl.SIGN_IN_PAGE;

    if (!roleBaseRedirection[user.role]) {
      removeCookies();
      removeUserFromLocalStorage();
      setAccessToken(undefined);
      setRefreshToken(undefined);
      setUser(undefined);
      setIsAuthenticated(false);
    }

    if (location.pathname === targetPage) {
      return;
    }

    navigate(targetPage, { replace: true });
  }, [
    location.pathname,
    navigate,
    setAccessToken,
    setIsAuthenticated,
    setRefreshToken,
    setUser,
    user,
  ]);

  return null;
}
