import { useContext, useMemo } from "react";
import { useHttp } from "./use-http";
import { UserTokenUpdateDto } from "../dtos/user/UserTokenUpdateDto";
import { apiEndpoints } from "../appConstants";
import { UserProfileUpdateDto } from "../dtos/user/UserProfileUpdateDto";
import { AlertContext } from "../contexts/alert-context";

type UserHook = {
  updateUserProfile(
    userId: string,
    userProfileUpdateDto: UserProfileUpdateDto
  ): Promise<UserTokenUpdateDto>;
};

export function useUser(): UserHook {
  const { put } = useHttp();
  const { handleErrorAlert } = useContext(AlertContext);

  return useMemo(
    () => ({
      updateUserProfile(
        userId: string,
        userProfileUpdateDto: UserProfileUpdateDto
      ): Promise<UserTokenUpdateDto> {
        return put(
          `${apiEndpoints.USER_UPDATE_PROFILE}/${userId}`,
          userProfileUpdateDto
        )
          .then((response) => response.json())
          .catch((error) => {
            handleErrorAlert(error);
            throw error;
          });
      },
    }),
    [handleErrorAlert, put]
  );
}
