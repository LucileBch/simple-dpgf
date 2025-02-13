import { OrganizationDto } from "../dtos/organization/OrganizationDto";
import { useHttp } from "./use-http";
import { apiEndpoints } from "../appConstants";
import { UserDto } from "../dtos/user/UserDto";
import { OrganizationLicenseUpdateDto } from "../dtos/OrganizationLicenseUpdateDto";
import { useMemo } from "react";

type OrganizationHook = {
  fetchOrganizationList(): Promise<OrganizationDto[]>;
  fetchOrganizationById(organizationId: string): Promise<OrganizationDto>;
  fetchMembersByOrganizationId(organizationId: string): Promise<UserDto[]>;
  deleteOrganizationById(organizationId: string): Promise<Response>;
  updateOrganizationLicense(
    organizationId: string,
    organizationLicenseUpdateDto: OrganizationLicenseUpdateDto
  ): Promise<OrganizationDto>;
};

export function useOrganization(): OrganizationHook {
  const { get, put, deleteRequest } = useHttp();

  return useMemo(
    () => ({
      fetchOrganizationList(): Promise<OrganizationDto[]> {
        return get(`${apiEndpoints.ORGANIZATION_GELL_ALL}`).then((response) =>
          response.json()
        );
      },
      fetchOrganizationById(organizationId: string): Promise<OrganizationDto> {
        return get(`${apiEndpoints.ORGANIZATION_BY_ID}/${organizationId}`).then(
          (response) => response.json()
        );
      },
      fetchMembersByOrganizationId(organizationId: string): Promise<UserDto[]> {
        return get(
          `${apiEndpoints.ORGANIZATION_GET_MEMBERS}/${organizationId}/member-list`
        ).then((response) => response.json());
      },
      deleteOrganizationById(organizationId: string): Promise<Response> {
        return deleteRequest(
          `${apiEndpoints.ORGANIZATION_DELETE_BY_ID}/${organizationId}`
        );
      },
      updateOrganizationLicense(
        organizationId: string,
        organizationUpdateLicenseDto: OrganizationLicenseUpdateDto
      ): Promise<OrganizationDto> {
        return put(
          `${apiEndpoints.ORGANIZATION_UPDATE_LICENSE}/${organizationId}/update-license`,
          organizationUpdateLicenseDto
        ).then((response) => response.json());
      },
    }),
    [get, put, deleteRequest]
  );
}
