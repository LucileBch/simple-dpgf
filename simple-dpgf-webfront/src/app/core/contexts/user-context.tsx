import React, { useCallback, useEffect, useMemo, useState } from "react";
import { UserDetailsDto } from "../dtos/user/UserDetailsDto";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserInLocalStorage,
} from "../services/authentication-service";
import { useUser } from "../hooks/use-user";

export const UserContext = React.createContext<UserStore>({} as UserStore);

export function UserContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const initialUser: UserDetailsDto | undefined = useMemo(
    () => getUserFromLocalStorage(),
    []
  );

  const { getCurrentUser } = useUser();

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

  const getCurrentUserConnexion = useCallback(() => {
    getCurrentUser().then((newUser) => {
      setUser(newUser);
    });
  }, [getCurrentUser]);

  // logout
  // unset cookie
  // unset localStorage
  // unset setUSer

  const userStore: UserStore = useMemo(
    () => ({
      user,
      getCurrentUserConnexion,
    }),
    [user, getCurrentUserConnexion]
  );

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
}

export type UserStore = {
  user: UserDetailsDto | undefined;
  getCurrentUserConnexion(): void;
};
