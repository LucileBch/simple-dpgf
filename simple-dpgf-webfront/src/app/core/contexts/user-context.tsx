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
  setTokensInCookies,
  setUserInLocalStorage,
} from "../services/authentication-service";
import { useHttp } from "../hooks/use-http";
import { apiEndpoints } from "../appConstants";
import { TokenContext } from "./token-context";
import { useUser } from "../hooks/use-user";
import { UserProfileUpdateDto } from "../dtos/user/UserProfileUpdateDto";
import { useParams } from "react-router-dom";
import { AlertContext } from "./alert-context";

export const UserContext = React.createContext<UserStore>({} as UserStore);

export function UserContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { userId } = useParams();

  const { post } = useHttp();
  const { updateUserProfile } = useUser();

  const { handleErrorAlert } = useContext(AlertContext);
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

  const updateUserProfileAndTokens = useCallback(
    async (userUpdateProfileDto: UserProfileUpdateDto) => {
      if (!userId) {
        handleErrorAlert("Identifiant utilisateur invalide");
        return;
      }

      const updatedUser = await updateUserProfile(userId, userUpdateProfileDto);

      const userDetailsDto: UserDetailsDto = {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      };
      setUser(userDetailsDto);

      removeUserFromLocalStorage();
      setUserInLocalStorage(userDetailsDto);

      if (updatedUser.accessToken && updatedUser.refreshToken) {
        removeCookies();
        setAccessToken(updatedUser.accessToken);
        setRefreshToken(updatedUser.refreshToken);
        setTokensInCookies(updatedUser.accessToken, updatedUser.refreshToken);
      }
    },
    [
      handleErrorAlert,
      setAccessToken,
      setRefreshToken,
      updateUserProfile,
      userId,
    ]
  );

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
      updateUserProfileAndTokens,
      logoutUser,
    }),
    [user, setUser, updateUserProfileAndTokens, logoutUser]
  );

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
}

export type UserStore = {
  user: UserDetailsDto | undefined;
  setUser: Dispatch<SetStateAction<UserDetailsDto | undefined>>;
  logoutUser(): Promise<void>;
  updateUserProfileAndTokens(
    //userId userId: string,
    userUpdateProfileDto: UserProfileUpdateDto
  ): Promise<void>;
};
