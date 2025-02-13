import { ReactNode, useContext } from "react";
import { TokenContext } from "../../core/contexts/token-context";
import { pagesUrl } from "../../core/appConstants";
import { Navigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function RequireAuth({
  children,
}: Readonly<IProps>): JSX.Element {
  const { isAuthenticated } = useContext(TokenContext);

  if (!isAuthenticated) {
    return <Navigate to={pagesUrl.SIGN_IN_PAGE} replace />;
  }

  return <>{children}</>;
}
