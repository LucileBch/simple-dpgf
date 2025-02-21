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
import { ProductCreationDto } from "../dtos/product/ProductCreationDto";
import { ProductDto } from "../dtos/product/ProductDto";

export const DpgfContext = React.createContext<DpgfStore>({} as DpgfStore);

export function DpgfContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { dpgfId } = useParams();

  const {
    postNewDpgf,
    fetchAllDpgf,
    putDpgfStatus,
    deleteDpgfById,
    fetchAllDpgfByOrganizationId,
    postLotInDpgf,
    fetchAllLotByDpgfId,
    postProductInLot,
    fetchAllProductByDpgfId,
  } = useDpgf();

  const { user } = useContext(UserContext);
  const { organization } = useContext(OrganizationContext);

  const [dpgf, setDpgf] = useState<DpgfDto | undefined>(undefined);
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

  console.log("lotList", lotList);
  console.log("selectedLot", selectedLot);

  const createNewDpgf = useCallback(
    async (formData: DpgfCreationDto): Promise<DpgfDto> => {
      const response = await postNewDpgf(formData);
      setDpgf(response);
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

  // for organization manager
  const getAllDpgfByOrganizationId = useCallback(
    async (organization: OrganizationDto) => {
      console.log("je passe ici", organization);

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
    if (user?.role === RoleEnum.PROJECT_OWNER && dpgfId) {
      getLotListByDpgfId(dpgfId);
    }
  }, [dpgfId, getLotListByDpgfId, user?.role]);

  // products
  const createProduct = useCallback(
    async (dpgfId: string, lotId: string, formData: ProductCreationDto) => {
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
    if (user?.role === RoleEnum.PROJECT_OWNER && dpgfId) {
      getProductListByDpgfId(dpgfId);
    }
  }, [dpgfId, getProductListByDpgfId, user?.role]);

  const dpgfStore: DpgfStore = useMemo(
    () => ({
      dpgf,
      dpgfByUserList,
      isDpgfByUserListLoading,
      dpgfByOrganizationList,
      isDpgfByOrganizationListLoading,
      isLotListLoading,
      lotList,
      productList,
      selectedLot,
      isProductListLoading,
      setSelectedLot,
      setProductList,
      setDpgf,
      setDpgfByUserList,
      createNewDpgf,
      updateDpgfStatus,
      deleteDpgf,
      createLotForDpgf,
      getLotListByDpgfId,
      createProduct,
      getProductListByDpgfId,
    }),
    [
      dpgf,
      dpgfByUserList,
      isDpgfByUserListLoading,
      dpgfByOrganizationList,
      isDpgfByOrganizationListLoading,
      isLotListLoading,
      lotList,
      productList,
      selectedLot,
      isProductListLoading,
      setSelectedLot,
      setProductList,
      setDpgf,
      setDpgfByUserList,
      createNewDpgf,
      updateDpgfStatus,
      deleteDpgf,
      createLotForDpgf,
      getLotListByDpgfId,
      createProduct,
      getProductListByDpgfId,
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
  isLotListLoading: boolean;
  lotList: LotDto[] | undefined;
  productList: ProductDto[] | undefined;
  selectedLot: LotDto | undefined;
  isProductListLoading: boolean;
  setSelectedLot: Dispatch<SetStateAction<LotDto | undefined>>;
  setProductList: Dispatch<SetStateAction<ProductDto[] | undefined>>;
  setDpgf: Dispatch<SetStateAction<DpgfDto | undefined>>;
  setDpgfByUserList: Dispatch<SetStateAction<DpgfDto[]>>;
  createNewDpgf(formData: DpgfCreationDto): Promise<DpgfDto>;
  updateDpgfStatus(dpgfId: string, dpgfStatus: DpgfStatusEnum): Promise<void>;
  deleteDpgf(dpgfId: string): Promise<void>;
  createLotForDpgf(dpgfId: string, lot: LotEnum): Promise<LotDto>;
  getLotListByDpgfId(dpgfId: string): Promise<void>;
  createProduct(
    dpgfId: string,
    lotId: string,
    formData: ProductCreationDto
  ): Promise<ProductDto>;
  getProductListByDpgfId(dpgfId: string): Promise<void>;
}>;
