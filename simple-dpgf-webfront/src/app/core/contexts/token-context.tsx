import Cookies from "js-cookie";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getAccessTokenFromCookies,
  getRefreshTokenFromCookies,
} from "../services/authentication-service";

export const TokenContext = React.createContext<TokenStore>({} as TokenStore);

export function TokenContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const initialAccessToken: string | undefined = useMemo(
    () => getAccessTokenFromCookies(),
    []
  );
  const initialRefreshToken: string | undefined = useMemo(
    () => getRefreshTokenFromCookies(),
    []
  );
  const initialIsAuthenticated: boolean = useMemo(() => {
    return !!initialAccessToken;
  }, [initialAccessToken]);

  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialIsAuthenticated
  );

  useEffect(() => {
    const storedAccessToken = Cookies.get("accessToken");
    const storedRefreshToken = Cookies.get("refreshToken");
    if (accessToken) {
      setAccessToken(storedAccessToken);
      setIsAuthenticated(!!accessToken);
    }
    if (refreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, [accessToken, refreshToken]);

  // fonction de refresh-token
  //  const refreshToken:() =>

  const tokenStore: TokenStore = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
      isAuthenticated,
      setIsAuthenticated,
    }),
    [
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
      isAuthenticated,
      setIsAuthenticated,
    ]
  );

  return (
    <TokenContext.Provider value={tokenStore}>{children}</TokenContext.Provider>
  );
}

export type TokenStore = {
  accessToken: string | undefined;
  setAccessToken: Dispatch<SetStateAction<string | undefined>>;
  refreshToken: string | undefined;
  setRefreshToken: Dispatch<SetStateAction<string | undefined>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};
