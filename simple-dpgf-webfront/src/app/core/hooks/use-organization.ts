import { useMemo } from "react";
import { OrganizationDto } from "../dtos/organization/OrganizationDto";
import { useHttp } from "./use-http";
import { apiEndpoints } from "../appConstants";
import { UserDto } from "../dtos/user/UserDto";

type OrganizationHook = {
  fetchOrganizationList(): Promise<OrganizationDto[]>;
  fetchOrganizationById(organizationId: string): Promise<OrganizationDto>;
  fetchMembersByOrganizationId(organizationId: string): Promise<UserDto[]>;
};

export function useOrganization(): OrganizationHook {
  const { get } = useHttp();

  return useMemo(
    () => ({
      fetchOrganizationList(): Promise<OrganizationDto[]> {
        return get(`${apiEndpoints.GET_ALL_ORGANIZATIONS}`).then((response) =>
          response.json()
        );
      },
      fetchOrganizationById(organizationId: string): Promise<OrganizationDto> {
        return get(`${apiEndpoints.ORGANIZATION}/${organizationId}`).then(
          (response) => response.json()
        );
      },
      fetchMembersByOrganizationId(organizationId: string): Promise<UserDto[]> {
        return get(
          `${apiEndpoints.GET_MEMBERS}/${organizationId}/member-list`
        ).then((response) => response.json());
      },
    }),
    [get]
  );
}
