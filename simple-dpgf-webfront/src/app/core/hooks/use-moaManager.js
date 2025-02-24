import { useMemo } from "react";
import { apiEndpoints } from "../appConstants";
import { useHttp } from "./use-http";
export function useMoaManger() {
    const { post } = useHttp();
    return useMemo(() => ({
        sendInvitation(formData) {
            return post(apiEndpoints.SEND_PROJECT_OWNER_INVITATION, formData);
        },
    }), [post]);
}
