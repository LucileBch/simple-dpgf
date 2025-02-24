import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useContext, useEffect, useMemo, useState, } from "react";
import { useOrganization } from "../hooks/use-organization";
import { UserContext } from "./user-context";
import { RoleEnum } from "../enums/RoleEnum";
export const OrganizationContext = React.createContext({});
export function OrganizationContextProvider({ children, }) {
    const { fetchOrganizationInvitedMembers, deleteOrganizationMember, deletePendingInvitation, } = useOrganization();
    const { user } = useContext(UserContext);
    const [organization, setOrganization] = useState(undefined);
    const [invitedMemberList, setInvitedMemberList] = useState([]);
    const [isInvitedMemberListLoading, setIsInvitedMemberListLoading] = useState(false);
    const getInvitedMembers = useCallback((organization) => {
        setIsInvitedMemberListLoading(true);
        fetchOrganizationInvitedMembers(organization?.id)
            .then((newInvitedMemberList) => setInvitedMemberList(newInvitedMemberList))
            .finally(() => setIsInvitedMemberListLoading(false));
    }, [fetchOrganizationInvitedMembers]);
    useEffect(() => {
        if (user?.role === RoleEnum.ORGANIZATION_MANAGER && organization) {
            getInvitedMembers(organization);
        }
    }, [organization, user?.role]);
    const deleteTeamMember = useCallback(async (organizationId, invitationId) => {
        await deleteOrganizationMember(organizationId, invitationId);
        setInvitedMemberList((prev) => prev.filter((invitation) => invitation.id !== invitationId));
    }, [deleteOrganizationMember]);
    const cancelInvitation = useCallback(async (invitationId) => {
        await deletePendingInvitation(invitationId);
        setInvitedMemberList((prev) => prev.filter((invitation) => invitation.id !== invitationId));
    }, [deletePendingInvitation]);
    const OrganizationStore = useMemo(() => ({
        organization,
        invitedMemberList,
        isInvitedMemberListLoading,
        setOrganization,
        getInvitedMembers,
        deleteTeamMember,
        cancelInvitation,
    }), [
        organization,
        invitedMemberList,
        isInvitedMemberListLoading,
        setOrganization,
        getInvitedMembers,
        deleteTeamMember,
        cancelInvitation,
    ]);
    return (_jsx(OrganizationContext.Provider, { value: OrganizationStore, children: children }));
}
