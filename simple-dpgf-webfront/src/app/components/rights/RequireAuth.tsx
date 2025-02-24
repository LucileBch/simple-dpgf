import React, { ReactNode, useCallback, useContext, useEffect } from "react";
import { TokenContext } from "../../core/contexts/token-context";
import { pagesUrl } from "../../core/appConstants";
import { Navigate } from "react-router-dom";
import { useOrganization } from "../../core/hooks/use-organization";
import { OrganizationContext } from "../../core/contexts/organization-context";
interface IProps {
  children: ReactNode;
}

export default function RequireAuth({
  children,
}: Readonly<IProps>): React.JSX.Element {
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
    return <Navigate to={pagesUrl.SIGN_IN_PAGE} replace />;
  }

  return <>{children}</>;
}
