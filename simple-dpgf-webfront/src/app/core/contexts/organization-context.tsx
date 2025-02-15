/* eslint-disable react-refresh/only-export-components */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { OrganizationDto } from "../dtos/organization/OrganizationDto";
import { InvitationDto } from "../dtos/invitation/InvitationDto";
import { useOrganization } from "../hooks/use-organization";

export const OrganizationContext = React.createContext<OrganizationStore>(
  {} as OrganizationStore
);

export function OrganizationContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const {
    fetchOrganizationInvitedMembers,
    deleteOrganizationMember,
    deletePendingInvitation,
  } = useOrganization();

  const [organization, setOrganization] = useState<OrganizationDto | undefined>(
    undefined
  );
  const [invitedMemberList, setInvitedMemberList] = useState<InvitationDto[]>(
    []
  );
  const [isInvitedMemberListLoading, setIsInvitedMemberListLoading] =
    useState<boolean>(false);

  const getInvitedMembers = useCallback(() => {
    if (organization != undefined) {
      setIsInvitedMemberListLoading(true);
      fetchOrganizationInvitedMembers(organization?.id)
        .then((newInvitedMemberList) =>
          setInvitedMemberList(newInvitedMemberList)
        )
        .finally(() => setIsInvitedMemberListLoading(false));
    }
  }, [fetchOrganizationInvitedMembers, organization]);

  useEffect(() => {
    getInvitedMembers();
  }, [getInvitedMembers]);

  const deleteTeamMember = useCallback(
    async (organizationId: string, invitationId: string) => {
      await deleteOrganizationMember(organizationId, invitationId);
      setInvitedMemberList((prev) =>
        prev.filter((invitation) => invitation.id !== invitationId)
      );
    },
    [deleteOrganizationMember]
  );

  const cancelInvitation = useCallback(
    async (invitationId: string) => {
      await deletePendingInvitation(invitationId);
      setInvitedMemberList((prev) =>
        prev.filter((invitation) => invitation.id !== invitationId)
      );
    },
    [deletePendingInvitation]
  );

  const OrganizationStore: OrganizationStore = useMemo(
    () => ({
      organization,
      invitedMemberList,
      isInvitedMemberListLoading,
      setOrganization,
      getInvitedMembers,
      deleteTeamMember,
      cancelInvitation,
    }),
    [
      organization,
      invitedMemberList,
      isInvitedMemberListLoading,
      setOrganization,
      getInvitedMembers,
      deleteTeamMember,
      cancelInvitation,
    ]
  );

  return (
    <OrganizationContext.Provider value={OrganizationStore}>
      {children}
    </OrganizationContext.Provider>
  );
}

export type OrganizationStore = Readonly<{
  organization: OrganizationDto | undefined;
  invitedMemberList: InvitationDto[];
  isInvitedMemberListLoading: boolean;
  setOrganization: Dispatch<SetStateAction<OrganizationDto | undefined>>;
  getInvitedMembers(): void;
  deleteTeamMember(organizationId: string, userId: string): Promise<void>;
  cancelInvitation(userId: string): Promise<void>;
}>;
