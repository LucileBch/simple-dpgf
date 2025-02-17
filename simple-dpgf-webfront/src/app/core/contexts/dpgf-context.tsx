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

export const DpgfContext = React.createContext<DpgfStore>({} as DpgfStore);

export function DpgfContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const {
    postNewDpgf,
    fetchAllDpgf,
    putDpgfStatus,
    deleteDpgfById,
    fetchAllDpgfByOrganizationId,
  } = useDpgf();

  const { user } = useContext(UserContext);
  const { organization } = useContext(OrganizationContext);

  console.log("organization in dpgf context", organization);

  const [dpgf, setDpgf] = useState<DpgfDto | undefined>(undefined);
  const [dpgfByUserList, setDpgfByUserList] = useState<DpgfDto[]>([]);
  const [isDpgfByUserListLoading, setIsDpgfByUserListLoading] =
    useState<boolean>(false);
  const [dpgfByOrganizationList, setDpgfByOrganiztionList] = useState<
    DpgfDto[]
  >([]);
  const [isDpgfByOrganizationListLoading, setIsDpgfByOrganizationListLoading] =
    useState<boolean>(false);

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

  const dpgfStore: DpgfStore = useMemo(
    () => ({
      dpgf,
      dpgfByUserList,
      isDpgfByUserListLoading,
      dpgfByOrganizationList,
      isDpgfByOrganizationListLoading,
      setDpgf,
      setDpgfByUserList,
      createNewDpgf,
      updateDpgfStatus,
      deleteDpgf,
    }),
    [
      dpgf,
      dpgfByUserList,
      isDpgfByUserListLoading,
      dpgfByOrganizationList,
      isDpgfByOrganizationListLoading,
      setDpgf,
      setDpgfByUserList,
      createNewDpgf,
      updateDpgfStatus,
      deleteDpgf,
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
  setDpgf: Dispatch<SetStateAction<DpgfDto | undefined>>;
  setDpgfByUserList: Dispatch<SetStateAction<DpgfDto[]>>;
  createNewDpgf(formData: DpgfCreationDto): Promise<DpgfDto>;
  updateDpgfStatus(dpgfId: string, dpgfStatus: DpgfStatusEnum): Promise<void>;
  deleteDpgf(dpgfId: string): Promise<void>;
}>;
