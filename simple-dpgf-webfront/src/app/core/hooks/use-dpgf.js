import { useMemo } from "react";
import { useHttp } from "./use-http";
import { apiEndpoints } from "../appConstants";
import { resolveUrl } from "../services/http-service";
export function useDpgf() {
    const { get, post, put, deleteRequest } = useHttp();
    return useMemo(() => ({
        postNewDpgf(formData) {
            return post(apiEndpoints.CREATE_DPGF, formData).then((response) => response.json());
        },
        fetchAllDpgf() {
            return get(apiEndpoints.GET_ALL_DPGF).then((response) => response.json());
        },
        fetchDpgfById(dpgfId) {
            return get(resolveUrl(apiEndpoints.GET_DPGF_BY_ID, [dpgfId])).then((response) => response.json());
        },
        putDpgfStatus(dpgfId, dpgfStatus) {
            return put(resolveUrl(apiEndpoints.UPDATE_DPGF_STATUS, [dpgfId], {
                dpgfStatus: dpgfStatus,
            }), {});
        },
        deleteDpgfById(dpgfId) {
            return deleteRequest(resolveUrl(apiEndpoints.DELETE_DPGF_BY_ID, [dpgfId]));
        },
        fetchAllDpgfByOrganizationId(organizationId) {
            return get(resolveUrl(apiEndpoints.GET_ALL_DPGF_BY_ORGANIZATION_ID, [
                organizationId,
            ])).then((response) => response.json());
        },
        postLotInDpgf(dpgfId, lot) {
            return post(resolveUrl(apiEndpoints.CREATE_LOT, [dpgfId], { lotName: lot }), {}).then((response) => response.json());
        },
        deleteLotInDpgf(dpgfId, lotId) {
            return deleteRequest(resolveUrl(apiEndpoints.DELETE_LOT, [dpgfId, lotId]));
        },
        fetchAllLotByDpgfId(dpgfId) {
            return get(resolveUrl(apiEndpoints.GET_ALL_LOT, [dpgfId])).then((response) => response.json());
        },
        postProductInLot(dpgfId, lotId, formData) {
            return post(resolveUrl(apiEndpoints.CREATE_PRODUCT, [dpgfId, lotId]), formData).then((response) => response.json());
        },
        fetchAllProductByDpgfId(dpgfId) {
            return get(resolveUrl(apiEndpoints.GET_ALL_PRODUCT, [dpgfId])).then((response) => response.json());
        },
        updateProductById(dpgfId, productId, formData) {
            return put(resolveUrl(apiEndpoints.PUT_PRODUCT_BY_ID, [dpgfId, productId]), formData).then((response) => response.json());
        },
        deleteProductByIdAndReCalculate(dpgfId, productId) {
            return deleteRequest(resolveUrl(apiEndpoints.PUT_PRODUCT_BY_ID, [dpgfId, productId]));
        },
    }), [get, post, put, deleteRequest]);
}
