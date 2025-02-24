import { useMemo } from "react";
import { useHttp } from "./use-http";
import { apiEndpoints } from "../appConstants";
export function useUser() {
    const { put } = useHttp();
    return useMemo(() => ({
        updateUserProfile: async (userId, userProfileUpdateDto) => {
            const response = await put(`${apiEndpoints.USER_UPDATE_PROFILE}/${userId}`, userProfileUpdateDto);
            return response.json();
        },
    }), [put]);
}
