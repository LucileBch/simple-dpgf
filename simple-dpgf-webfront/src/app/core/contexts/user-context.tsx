import React, {
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
  setUserInLocalStorage,
} from "../services/authentication-service";
import { useUser } from "../hooks/use-user";
import { useHttp } from "../hooks/use-http";
import { apiEndpoints } from "../appConstants";
import { TokenContext } from "./token-context";

// type AuthResponse = {
//   [key: string]: string;
// };

export const UserContext = React.createContext<UserStore>({} as UserStore);

export function UserContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { post } = useHttp();
  const { getCurrentUser } = useUser();

  const { setIsAuthenticated } = useContext(TokenContext);

  const initialUser: UserDetailsDto | undefined = useMemo(
    () => getUserFromLocalStorage(),
    []
  );
  const [user, setUser] = useState<UserDetailsDto | undefined>(initialUser);

  // set user in local storage
  useEffect(() => {
    if (user === undefined) {
      removeUserFromLocalStorage();
    } else {
      setUserInLocalStorage(user);
    }
  }, [user]);

  // if not authenticated, setUser => undefined
  //   useEffect(() => {
  //     if (!isAuthenticated) {
  //       setUser(undefined);
  //     }
  //   }, [isAuthenticated]);

  const getCurrentUserConnexion = useCallback(async () => {
    getCurrentUser().then((newUser) => {
      setUser(newUser);
    });
  }, [getCurrentUser]);

  const logoutUser = useCallback(async () => {
    try {
      await post(apiEndpoints.SIGN_OUT, []);
    } catch (error) {
      console.log("logout problème", error);
    } finally {
      removeCookies();
      removeUserFromLocalStorage();
      setIsAuthenticated(false);
      setUser(undefined);
    }
  }, [post, setIsAuthenticated]);

  //   const loginUser = useCallback(
  //     async (
  //       userAuthenticationDto: UserAuthenticationDto
  //     ): Promise<AuthResponse | null> => {
  //       try {
  //         const response = await post(
  //           apiEndpoints.SIGN_IN,
  //           userAuthenticationDto,
  //           []
  //         );
  //         const data: AuthResponse = await response.json(); // Attendre la conversion JSON
  //         setIsAuthenticated(true);
  //         return data;
  //       } catch (error) {
  //         console.log("login error", error);
  //         setIsAuthenticated(false);
  //         return null;
  //       }
  //     },
  //     [post, setIsAuthenticated]
  //   );

  const userStore: UserStore = useMemo(
    () => ({
      user,
      getCurrentUserConnexion,
      logoutUser,
    }),
    [user, getCurrentUserConnexion, logoutUser]
  );

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
}

export type UserStore = {
  user: UserDetailsDto | undefined;
  getCurrentUserConnexion(): void;
  logoutUser(): Promise<void>;
  //loginUser(
  //     userAuthenticationDto: UserAuthenticationDto
  //   ): Promise<AuthResponse | null>;
};
