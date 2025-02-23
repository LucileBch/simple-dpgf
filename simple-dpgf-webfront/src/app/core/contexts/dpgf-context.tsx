/* eslint-disable react-refresh/only-export-components */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDpgf } from "../hooks/use-dpgf";
import { DpgfDto } from "../dtos/dpgf/DpgfDto";
import { DpgfCreationDto } from "../dtos/dpgf/DpgfCreationDto";
import { DpgfStatusEnum } from "../enums/DpgfStatusEnum";
import { RoleEnum } from "../enums/RoleEnum";
import { UserContext } from "./user-context";
import { OrganizationContext } from "./organization-context";
import { OrganizationDto } from "../dtos/organization/OrganizationDto";
import { LotDto } from "../dtos/lot/LotDto";
import { LotEnum } from "../enums/LotEnum";
import { useParams } from "react-router-dom";
import { ProductCreationOrUpdateDto } from "../dtos/product/ProductCreationDto";
import { ProductDto } from "../dtos/product/ProductDto";

export const DpgfContext = React.createContext<DpgfStore>({} as DpgfStore);

export function DpgfContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { dpgfId } = useParams();

  const {
    postNewDpgf,
    fetchAllDpgf,
    fetchDpgfById,
    putDpgfStatus,
    deleteDpgfById,
    fetchAllDpgfByOrganizationId,
    postLotInDpgf,
    deleteLotInDpgf,
    fetchAllLotByDpgfId,
    postProductInLot,
    fetchAllProductByDpgfId,
    updateProductById,
    deleteProductByIdAndReCalculate,
  } = useDpgf();

  const { user } = useContext(UserContext);
  const { organization } = useContext(OrganizationContext);

  const [dpgf, setDpgf] = useState<DpgfDto | undefined>(undefined);
  const [isDpgfLoading, setIsDpgfLoading] = useState<boolean>(false);

  const [dpgfByUserList, setDpgfByUserList] = useState<DpgfDto[]>([]);
  const [isDpgfByUserListLoading, setIsDpgfByUserListLoading] =
    useState<boolean>(false);
  const [dpgfByOrganizationList, setDpgfByOrganiztionList] = useState<
    DpgfDto[]
  >([]);
  const [isDpgfByOrganizationListLoading, setIsDpgfByOrganizationListLoading] =
    useState<boolean>(false);

  const [lotList, setLotList] = useState<LotDto[] | undefined>([]);
  const [isLotListLoading, setIsLotListLoading] = useState<boolean>(false);

  const [selectedLot, setSelectedLot] = useState<LotDto | undefined>(undefined);

  const [productList, setProductList] = useState<ProductDto[] | undefined>([]);
  const [isProductListLoading, setIsProductListLoading] =
    useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<
    ProductDto | undefined
  >(undefined);

  const createNewDpgf = useCallback(
    async (formData: DpgfCreationDto): Promise<DpgfDto> => {
      const response = await postNewDpgf(formData);
      return response;
    },
    [postNewDpgf]
  );

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

  const getDpgf = useCallback(
    async (dpgfId: string) => {
      setIsDpgfLoading(true);
      fetchDpgfById(dpgfId)
        .then((dpgf) => setDpgf(dpgf))
        .finally(() => setIsDpgfLoading(false));
    },
    [fetchDpgfById]
  );

  useEffect(() => {
    if (dpgfId) {
      getDpgf(dpgfId);
    }
  }, [dpgfId, getDpgf]);

  // for organization manager
  const getAllDpgfByOrganizationId = useCallback(
    async (organization: OrganizationDto) => {
      setIsDpgfByOrganizationListLoading(true);
      fetchAllDpgfByOrganizationId(organization?.id)
        .then((newDpgfList) => setDpgfByOrganiztionList(newDpgfList))
        .finally(() => setIsDpgfByOrganizationListLoading(false));
    },
    [fetchAllDpgfByOrganizationId]
  );

  useEffect(() => {
    if (user?.role === RoleEnum.ORGANIZATION_MANAGER && organization) {
      getAllDpgfByOrganizationId(organization);
    }
  }, [getAllDpgfByOrganizationId, organization, user?.role]);

  const updateDpgfStatus = useCallback(
    async (dpgfId: string, dpgfStatus: DpgfStatusEnum) => {
      await putDpgfStatus(dpgfId, dpgfStatus);
      setDpgf((prev) => (prev ? { ...prev, dpgfStatus: dpgfStatus } : prev));
      setDpgfByUserList((prev) =>
        prev
          ? prev.map((dpgf) =>
              dpgf.id === dpgfId ? { ...dpgf, dpgfStatus } : dpgf
            )
          : prev
      );
    },
    [putDpgfStatus]
  );

  const deleteDpgf = useCallback(
    async (dpgfId: string) => {
      await deleteDpgfById(dpgfId);
      setDpgf(undefined);
      setDpgfByUserList(
        (prev) => prev?.filter((dpgf) => dpgf.id !== dpgfId) ?? []
      );
    },
    [deleteDpgfById]
  );

  // Lots
  const createLotForDpgf = useCallback(
    async (dpgfId: string, lot: LotEnum): Promise<LotDto> => {
      const response = await postLotInDpgf(dpgfId, lot);
      setLotList((prev) => (prev ? [...prev, response] : [response]));
      return response;
    },
    [postLotInDpgf]
  );

  const deleteLotAndAssociatedProducts = useCallback(
    async (dpgfId: string, lotId: string) => {
      await deleteLotInDpgf(dpgfId, lotId);
    },
    [deleteLotInDpgf]
  );

  // fetch all Lot when landing on page
  const getLotListByDpgfId = useCallback(
    async (dpgfId: string) => {
      setIsLotListLoading(true);
      const response = await fetchAllLotByDpgfId(dpgfId);
      setLotList(response);
      setIsLotListLoading(false);
    },
    [fetchAllLotByDpgfId]
  );

  useEffect(() => {
    if (dpgfId) {
      getLotListByDpgfId(dpgfId);
    }
  }, [dpgfId, getLotListByDpgfId]);

  // products
  const createProduct = useCallback(
    async (
      dpgfId: string,
      lotId: string,
      formData: ProductCreationOrUpdateDto
    ) => {
      const response = await postProductInLot(dpgfId, lotId, formData);
      setProductList((prev) => (prev ? [...prev, response] : [response]));
      return response;
    },
    [postProductInLot]
  );

  const getProductListByDpgfId = useCallback(
    async (dpgfId: string) => {
      setIsProductListLoading(true);
      const response = await fetchAllProductByDpgfId(dpgfId);
      setProductList(response);
      setIsProductListLoading(false);
    },
    [fetchAllProductByDpgfId]
  );

  useEffect(() => {
    if (dpgfId) {
      getProductListByDpgfId(dpgfId);
    }
  }, [dpgfId, getProductListByDpgfId]);

  const updateProductInfos = useCallback(
    async (
      dpgfId: string,
      productId: string,
      formData: ProductCreationOrUpdateDto
    ) => {
      const updatedProduct = await updateProductById(
        dpgfId,
        productId,
        formData
      );

      return updatedProduct;
    },
    [updateProductById]
  );

  const deleteProductFromDpgf = useCallback(
    async (dpgfId: string, productId: string) => {
      await deleteProductByIdAndReCalculate(dpgfId, productId);
    },
    [deleteProductByIdAndReCalculate]
  );

  const dpgfStore: DpgfStore = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return (
    <DpgfContext.Provider value={dpgfStore}>{children}</DpgfContext.Provider>
  );
}

export type DpgfStore = Readonly<{
  dpgf: DpgfDto | undefined;
  dpgfByUserList: DpgfDto[];
  isDpgfByUserListLoading: boolean;
  dpgfByOrganizationList: DpgfDto[];
  isDpgfByOrganizationListLoading: boolean;
  isDpgfLoading: boolean;
  isLotListLoading: boolean;
  lotList: LotDto[] | undefined;
  productList: ProductDto[] | undefined;
  selectedLot: LotDto | undefined;
  isProductListLoading: boolean;
  selectedProduct: ProductDto | undefined;
  setSelectedProduct: Dispatch<SetStateAction<ProductDto | undefined>>;
  setLotList: Dispatch<SetStateAction<LotDto[] | undefined>>;
  setSelectedLot: Dispatch<SetStateAction<LotDto | undefined>>;
  setProductList: Dispatch<SetStateAction<ProductDto[] | undefined>>;
  setDpgf: Dispatch<SetStateAction<DpgfDto | undefined>>;
  setDpgfByUserList: Dispatch<SetStateAction<DpgfDto[]>>;
  createNewDpgf(formData: DpgfCreationDto): Promise<DpgfDto>;
  updateDpgfStatus(dpgfId: string, dpgfStatus: DpgfStatusEnum): Promise<void>;
  deleteDpgf(dpgfId: string): Promise<void>;
  createLotForDpgf(dpgfId: string, lot: LotEnum): Promise<LotDto>;
  deleteLotAndAssociatedProducts(dpgfId: string, lotId: string): Promise<void>;
  getLotListByDpgfId(dpgfId: string): Promise<void>;
  createProduct(
    dpgfId: string,
    lotId: string,
    formData: ProductCreationOrUpdateDto
  ): Promise<ProductDto>;
  getProductListByDpgfId(dpgfId: string): Promise<void>;
  updateProductInfos(
    dpgfId: string,
    productId: string,
    formData: ProductCreationOrUpdateDto
  ): Promise<ProductDto>;
  deleteProductFromDpgf(dpgfId: string, productId: string): Promise<void>;
}>;
