import { useMemo } from "react";
import { apiEndpoints } from "../appConstants";
import { InvitationCreationDto } from "../dtos/invitation/InvitationCreationDto";
import { useHttp } from "./use-http";

type MoeManagerHook = {
  sendInvitation(formData: InvitationCreationDto): Promise<Response>;
};

export function useMoeManager(): MoeManagerHook {
  const { post } = useHttp();

  return useMemo(
    () => ({
      sendInvitation(formData: InvitationCreationDto): Promise<Response> {
        return post(apiEndpoints.SEND_PROJECT_OWNER_INVITATION, formData);
      },
    }),
    [post]
  );
}
