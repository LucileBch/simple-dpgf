import { useHttp } from "./use-http";
import { apiEndpoints } from "../appConstants";
import { useMemo } from "react";
import { resolveUrl } from "../services/http-service";
export function useOrganization() {
    const { get, put, deleteRequest } = useHttp();
    return useMemo(() => ({
        fetchOrganizationList() {
            return get(`${apiEndpoints.ORGANIZATION_GELL_ALL}`).then((response) => response.json());
        },
        fetchOrganizationById(organizationId) {
            return get(`${apiEndpoints.ORGANIZATION_BY_ID}/${organizationId}`).then((response) => response.json());
        },
        fetchMembersByOrganizationId(organizationId) {
            return get(`${apiEndpoints.ORGANIZATION_GET_MEMBERS}/${organizationId}/member-list`).then((response) => response.json());
        },
        deleteOrganizationById(organizationId) {
            return deleteRequest(`${apiEndpoints.ORGANIZATION_DELETE_BY_ID}/${organizationId}`);
        },
        updateOrganizationLicense(organizationId, organizationUpdateLicenseDto) {
            return put(`${apiEndpoints.ORGANIZATION_UPDATE_LICENSE}/${organizationId}/update-license`, organizationUpdateLicenseDto).then((response) => response.json());
        },
        fetchOrganization() {
            return get(apiEndpoints.ORGANIZATION).then((response) => response.json());
        },
        fetchOrganizationInvitedMembers(organizationId) {
            return get(resolveUrl(apiEndpoints.GET_ORGANIZATION_INVITED_MEMBERS, [
                organizationId,
            ])).then((response) => response.json());
        },
        deleteOrganizationMember(organizationId, invitationId) {
            return deleteRequest(resolveUrl(apiEndpoints.DELETE_ORGANIZATION_MEMBER, [
                organizationId,
                invitationId,
            ]));
        },
        deletePendingInvitation(invitationId) {
            return deleteRequest(resolveUrl(apiEndpoints.DELETE_ORGANIZATION_INVITATION, [
                invitationId,
            ]));
        },
    }), [get, put, deleteRequest]);
}
