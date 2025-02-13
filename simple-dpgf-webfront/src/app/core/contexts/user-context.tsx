/* eslint-disable react-refresh/only-export-components */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserDetailsDto } from "../dtos/user/UserDetailsDto";
import {
  getUserFromLocalStorage,
  removeCookies,
  removeUserFromLocalStorage,
} from "../services/authentication-service";
import { useHttp } from "../hooks/use-http";
import { apiEndpoints } from "../appConstants";
import { TokenContext } from "./token-context";

export const UserContext = React.createContext<UserStore>({} as UserStore);

export function UserContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { post } = useHttp();

  const {
    isAuthenticated,
    setIsAuthenticated,
    setAccessToken,
    setRefreshToken,
  } = useContext(TokenContext);

  const initialUser: UserDetailsDto | undefined = useMemo(
    () => getUserFromLocalStorage(),
    []
  );
  const [user, setUser] = useState<UserDetailsDto | undefined>(initialUser);

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(undefined);
    }
  }, [isAuthenticated, setUser]);

  const logoutUser = useCallback(async () => {
    try {
      await post(apiEndpoints.SIGN_OUT, [], undefined, {
        credentials: "include",
      });
      removeCookies();
      removeUserFromLocalStorage();
      setAccessToken(undefined);
      setRefreshToken(undefined);
      setIsAuthenticated(false);
      setUser(undefined);
    } catch (error) {
      console.log("logout problème", error);
    }
  }, [post, setAccessToken, setIsAuthenticated, setRefreshToken]);

  const userStore: UserStore = useMemo(
    () => ({
      user,
      setUser,

      logoutUser,
    }),
    [user, setUser, logoutUser]
  );

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
}

export type UserStore = {
  user: UserDetailsDto | undefined;
  setUser: Dispatch<SetStateAction<UserDetailsDto | undefined>>;
  logoutUser(): Promise<void>;
};
