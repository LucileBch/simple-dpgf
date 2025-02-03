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

  const { isAuthenticated, setIsAuthenticated } = useContext(TokenContext);

  const initialUser: UserDetailsDto | undefined = useMemo(
    () => getUserFromLocalStorage(),
    []
  );
  const [user, setUser] = useState<UserDetailsDto | undefined>(initialUser);

  // Ajouter ce useEffect pour observer l'état de l'utilisateur
  useEffect(() => {
    console.log("L'état de l'utilisateur a changé : ", user);
  }, [user]); // Cela va logguer chaque changement de user

  // if not authenticated, setUser => undefined
  useEffect(() => {
    console.log("isAuthenticated changé : ", isAuthenticated);
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
      setIsAuthenticated(false);
      setUser(undefined);

      console.log("user after deco", user);
      console.log("LocalStorage après logout : ", localStorage.getItem("user"));
    } catch (error) {
      console.log("logout problème", error);
    }
  }, [post, setIsAuthenticated, user]);

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
