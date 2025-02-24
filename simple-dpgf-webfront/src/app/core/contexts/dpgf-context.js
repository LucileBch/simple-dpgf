import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useContext, useEffect, useMemo, useState, } from "react";
import { useDpgf } from "../hooks/use-dpgf";
import { RoleEnum } from "../enums/RoleEnum";
import { UserContext } from "./user-context";
import { OrganizationContext } from "./organization-context";
import { useParams } from "react-router-dom";
export const DpgfContext = React.createContext({});
export function DpgfContextProvider({ children, }) {
    const { dpgfId } = useParams();
    const { postNewDpgf, fetchAllDpgf, fetchDpgfById, putDpgfStatus, deleteDpgfById, fetchAllDpgfByOrganizationId, postLotInDpgf, deleteLotInDpgf, fetchAllLotByDpgfId, postProductInLot, fetchAllProductByDpgfId, updateProductById, deleteProductByIdAndReCalculate, } = useDpgf();
    const { user } = useContext(UserContext);
    const { organization } = useContext(OrganizationContext);
    const [dpgf, setDpgf] = useState(undefined);
    const [isDpgfLoading, setIsDpgfLoading] = useState(false);
    const [dpgfByUserList, setDpgfByUserList] = useState([]);
    const [isDpgfByUserListLoading, setIsDpgfByUserListLoading] = useState(false);
    const [dpgfByOrganizationList, setDpgfByOrganiztionList] = useState([]);
    const [isDpgfByOrganizationListLoading, setIsDpgfByOrganizationListLoading] = useState(false);
    const [lotList, setLotList] = useState([]);
    const [isLotListLoading, setIsLotListLoading] = useState(false);
    const [selectedLot, setSelectedLot] = useState(undefined);
    const [productList, setProductList] = useState([]);
    const [isProductListLoading, setIsProductListLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(undefined);
    const createNewDpgf = useCallback(async (formData) => {
        const response = await postNewDpgf(formData);
        return response;
    }, [postNewDpgf]);
    // for project owner
    const getAllDpgf = useCallback(async () => {
        setIsDpgfByUserListLoading(true);
        fetchAllDpgf()
            .then((newDpgfList) => setDpgfByUserList(newDpgfList))
            .finally(() => setIsDpgfByUserListLoading(false));
    }, [fetchAllDpgf]);
    useEffect(() => {
        if (user?.role === RoleEnum.PROJECT_OWNER) {
            getAllDpgf();
        }
    }, [getAllDpgf, user?.role]);
    const getDpgf = useCallback(async (dpgfId) => {
        setIsDpgfLoading(true);
        fetchDpgfById(dpgfId)
            .then((dpgf) => setDpgf(dpgf))
            .finally(() => setIsDpgfLoading(false));
    }, [fetchDpgfById]);
    useEffect(() => {
        if (dpgfId) {
            getDpgf(dpgfId);
        }
    }, [dpgfId, getDpgf]);
    // for organization manager
    const getAllDpgfByOrganizationId = useCallback(async (organization) => {
        setIsDpgfByOrganizationListLoading(true);
        fetchAllDpgfByOrganizationId(organization?.id)
            .then((newDpgfList) => setDpgfByOrganiztionList(newDpgfList))
            .finally(() => setIsDpgfByOrganizationListLoading(false));
    }, [fetchAllDpgfByOrganizationId]);
    useEffect(() => {
        if (user?.role === RoleEnum.ORGANIZATION_MANAGER && organization) {
            getAllDpgfByOrganizationId(organization);
        }
    }, [getAllDpgfByOrganizationId, organization, user?.role]);
    const updateDpgfStatus = useCallback(async (dpgfId, dpgfStatus) => {
        await putDpgfStatus(dpgfId, dpgfStatus);
        setDpgf((prev) => (prev ? { ...prev, dpgfStatus: dpgfStatus } : prev));
        setDpgfByUserList((prev) => prev
            ? prev.map((dpgf) => dpgf.id === dpgfId ? { ...dpgf, dpgfStatus } : dpgf)
            : prev);
    }, [putDpgfStatus]);
    const deleteDpgf = useCallback(async (dpgfId) => {
        await deleteDpgfById(dpgfId);
        setDpgf(undefined);
        setDpgfByUserList((prev) => prev?.filter((dpgf) => dpgf.id !== dpgfId) ?? []);
    }, [deleteDpgfById]);
    // Lots
    const createLotForDpgf = useCallback(async (dpgfId, lot) => {
        const response = await postLotInDpgf(dpgfId, lot);
        setLotList((prev) => (prev ? [...prev, response] : [response]));
        return response;
    }, [postLotInDpgf]);
    const deleteLotAndAssociatedProducts = useCallback(async (dpgfId, lotId) => {
        await deleteLotInDpgf(dpgfId, lotId);
    }, [deleteLotInDpgf]);
    // fetch all Lot when landing on page
    const getLotListByDpgfId = useCallback(async (dpgfId) => {
        setIsLotListLoading(true);
        const response = await fetchAllLotByDpgfId(dpgfId);
        setLotList(response);
        setIsLotListLoading(false);
    }, [fetchAllLotByDpgfId]);
    useEffect(() => {
        if (dpgfId) {
            getLotListByDpgfId(dpgfId);
        }
    }, [dpgfId, getLotListByDpgfId]);
    // products
    const createProduct = useCallback(async (dpgfId, lotId, formData) => {
        const response = await postProductInLot(dpgfId, lotId, formData);
        setProductList((prev) => (prev ? [...prev, response] : [response]));
        return response;
    }, [postProductInLot]);
    const getProductListByDpgfId = useCallback(async (dpgfId) => {
        setIsProductListLoading(true);
        const response = await fetchAllProductByDpgfId(dpgfId);
        setProductList(response);
        setIsProductListLoading(false);
    }, [fetchAllProductByDpgfId]);
    useEffect(() => {
        if (dpgfId) {
            getProductListByDpgfId(dpgfId);
        }
    }, [dpgfId, getProductListByDpgfId]);
    const updateProductInfos = useCallback(async (dpgfId, productId, formData) => {
        const updatedProduct = await updateProductById(dpgfId, productId, formData);
        return updatedProduct;
    }, [updateProductById]);
    const deleteProductFromDpgf = useCallback(async (dpgfId, productId) => {
        await deleteProductByIdAndReCalculate(dpgfId, productId);
    }, [deleteProductByIdAndReCalculate]);
    const dpgfStore = useMemo(() => ({
        dpgf,
        dpgfByUserList,
        isDpgfByUserListLoading,
        dpgfByOrganizationList,
        isDpgfLoading,
        isDpgfByOrganizationListLoading,
        isLotListLoading,
        lotList,
        productList,
        selectedLot,
        isProductListLoading,
        selectedProduct,
        setSelectedProduct,
        setSelectedLot,
        setProductList,
        setDpgf,
        setLotList,
        setDpgfByUserList,
        createNewDpgf,
        updateDpgfStatus,
        deleteDpgf,
        createLotForDpgf,
        deleteLotAndAssociatedProducts,
        getLotListByDpgfId,
        createProduct,
        getProductListByDpgfId,
        updateProductInfos,
        deleteProductFromDpgf,
    }), [
        dpgf,
        dpgfByUserList,
        isDpgfByUserListLoading,
        dpgfByOrganizationList,
        isDpgfLoading,
        isDpgfByOrganizationListLoading,
        isLotListLoading,
        lotList,
        productList,
        selectedLot,
        isProductListLoading,
        selectedProduct,
        setSelectedProduct,
        setSelectedLot,
        setProductList,
        setDpgf,
        setLotList,
        setDpgfByUserList,
        createNewDpgf,
        deleteLotAndAssociatedProducts,
        updateDpgfStatus,
        deleteDpgf,
        createLotForDpgf,
        getLotListByDpgfId,
        createProduct,
        getProductListByDpgfId,
        updateProductInfos,
        deleteProductFromDpgf,
    ]);
    return (_jsx(DpgfContext.Provider, { value: dpgfStore, children: children }));
}
