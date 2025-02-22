import { useMemo } from "react";
import { useHttp } from "./use-http";
import { DpgfDto } from "../dtos/dpgf/DpgfDto";
import { apiEndpoints } from "../appConstants";
import { DpgfCreationDto } from "../dtos/dpgf/DpgfCreationDto";
import { resolveUrl } from "../services/http-service";
import { DpgfStatusEnum } from "../enums/DpgfStatusEnum";
import { LotDto } from "../dtos/lot/LotDto";
import { LotEnum } from "../enums/LotEnum";
import { ProductCreationOrUpdateDto } from "../dtos/product/ProductCreationDto";
import { ProductDto } from "../dtos/product/ProductDto";

type DpgfHook = {
  postNewDpgf(formData: DpgfCreationDto): Promise<DpgfDto>;
  fetchAllDpgf(): Promise<DpgfDto[]>;
  fetchDpgfById(dpgfId: string): Promise<DpgfDto>;
  putDpgfStatus(dpgfId: string, dpgfStatus: DpgfStatusEnum): Promise<Response>;
  deleteDpgfById(dpgfId: string): Promise<Response>;
  fetchAllDpgfByOrganizationId(organizationId: string): Promise<DpgfDto[]>;
  postLotInDpgf(dpgfId: string, lot: LotEnum): Promise<LotDto>;
  deleteLotInDpgf(dpgfId: string, lotId: string): Promise<Response>;
  fetchAllLotByDpgfId(dpgfId: string): Promise<LotDto[]>;
  postProductInLot(
    dpgfId: string,
    lotId: string,
    formData: ProductCreationOrUpdateDto
  ): Promise<ProductDto>;
  fetchAllProductByDpgfId(dpgfId: string): Promise<ProductDto[]>;
  updateProductById(
    dpgfId: string,
    productId: string,
    formData: ProductCreationOrUpdateDto
  ): Promise<ProductDto>;
  deleteProductByIdAndReCalculate(
    dpgfId: string,
    productId: string
  ): Promise<Response>;
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
      fetchDpgfById(dpgfId: string): Promise<DpgfDto> {
        return get(resolveUrl(apiEndpoints.GET_DPGF_BY_ID, [dpgfId])).then(
          (response) => response.json()
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
      postLotInDpgf(dpgfId: string, lot: LotEnum): Promise<LotDto> {
        return post(
          resolveUrl(apiEndpoints.CREATE_LOT, [dpgfId], { lotName: lot }),
          {}
        ).then((response) => response.json());
      },
      deleteLotInDpgf(dpgfId: string, lotId: string): Promise<Response> {
        return deleteRequest(
          resolveUrl(apiEndpoints.DELETE_LOT, [dpgfId, lotId])
        );
      },
      fetchAllLotByDpgfId(dpgfId: string): Promise<LotDto[]> {
        return get(resolveUrl(apiEndpoints.GET_ALL_LOT, [dpgfId])).then(
          (response) => response.json()
        );
      },
      postProductInLot(
        dpgfId: string,
        lotId: string,
        formData: ProductCreationOrUpdateDto
      ): Promise<ProductDto> {
        return post(
          resolveUrl(apiEndpoints.CREATE_PRODUCT, [dpgfId, lotId]),
          formData
        ).then((response) => response.json());
      },
      fetchAllProductByDpgfId(dpgfId: string): Promise<ProductDto[]> {
        return get(resolveUrl(apiEndpoints.GET_ALL_PRODUCT, [dpgfId])).then(
          (response) => response.json()
        );
      },
      updateProductById(
        dpgfId: string,
        productId: string,
        formData: ProductCreationOrUpdateDto
      ): Promise<ProductDto> {
        return put(
          resolveUrl(apiEndpoints.PUT_PRODUCT_BY_ID, [dpgfId, productId]),
          formData
        ).then((response) => response.json());
      },
      deleteProductByIdAndReCalculate(
        dpgfId: string,
        productId: string
      ): Promise<Response> {
        return deleteRequest(
          resolveUrl(apiEndpoints.PUT_PRODUCT_BY_ID, [dpgfId, productId])
        );
      },
    }),
    [get, post, put, deleteRequest]
  );
}
