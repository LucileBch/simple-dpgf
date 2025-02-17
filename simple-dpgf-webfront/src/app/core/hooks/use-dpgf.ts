import { useMemo } from "react";
import { useHttp } from "./use-http";
import { DpgfDto } from "../dtos/dpgf/DpgfDto";
import { apiEndpoints } from "../appConstants";
import { DpgfCreationDto } from "../dtos/dpgf/DpgfCreationDto";
import { resolveUrl } from "../services/http-service";
import { DpgfStatusEnum } from "../enums/DpgfStatusEnum";

type DpgfHook = {
  postNewDpgf(formData: DpgfCreationDto): Promise<DpgfDto>;
  fetchAllDpgf(): Promise<DpgfDto[]>;
  putDpgfStatus(dpgfId: string, dpgfStatus: DpgfStatusEnum): Promise<Response>;
  deleteDpgfById(dpgfId: string): Promise<Response>;
  fetchAllDpgfByOrganizationId(organizationId: string): Promise<DpgfDto[]>;
};

export function useDpgf(): DpgfHook {
  const { get, post, put, deleteRequest } = useHttp();

  return useMemo(
    () => ({
      postNewDpgf(formData: DpgfCreationDto): Promise<DpgfDto> {
        return post(apiEndpoints.CREATE_DPGF, formData).then((response) =>
          response.json()
        );
      },
      fetchAllDpgf(): Promise<DpgfDto[]> {
        return get(apiEndpoints.GET_ALL_DPGF).then((response) =>
          response.json()
        );
      },
      putDpgfStatus(
        dpgfId: string,
        dpgfStatus: DpgfStatusEnum
      ): Promise<Response> {
        return put(
          resolveUrl(apiEndpoints.UPDATE_DPGF_STATUS, [dpgfId], {
            dpgfStatus: dpgfStatus,
          }),
          {}
        );
      },
      deleteDpgfById(dpgfId: string): Promise<Response> {
        return deleteRequest(
          resolveUrl(apiEndpoints.DELETE_DPGF_BY_ID, [dpgfId])
        );
      },
      fetchAllDpgfByOrganizationId(organizationId: string): Promise<DpgfDto[]> {
        return get(
          resolveUrl(apiEndpoints.GET_ALL_DPGF_BY_ORGANIZATION_ID, [
            organizationId,
          ])
        ).then((response) => response.json());
      },
    }),
    [get, post, put, deleteRequest]
  );
}
