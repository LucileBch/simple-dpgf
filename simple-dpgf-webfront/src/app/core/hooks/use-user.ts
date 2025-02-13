import { useMemo } from "react";
import { useHttp } from "./use-http";
import { UserTokenUpdateDto } from "../dtos/user/UserTokenUpdateDto";
import { apiEndpoints } from "../appConstants";
import { UserProfileUpdateDto } from "../dtos/user/UserProfileUpdateDto";

type UserHook = {
  updateUserProfile(
    userId: string,
    userProfileUpdateDto: UserProfileUpdateDto
  ): Promise<UserTokenUpdateDto>;
};

export function useUser(): UserHook {
  const { put } = useHttp();

  return useMemo(
    () => ({
      updateUserProfile: async (
        userId: string,
        userProfileUpdateDto: UserProfileUpdateDto
      ): Promise<UserTokenUpdateDto> => {
        const response = await put(
          `${apiEndpoints.USER_UPDATE_PROFILE}/${userId}`,
          userProfileUpdateDto
        );

        return response.json();
      },
    }),
    [put]
  );
}
