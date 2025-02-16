/* eslint-disable react-refresh/only-export-components */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDpgf } from "../hooks/use-dpgf";
import { DpgfDto } from "../dtos/dpgf/DpgfDto";
import { DpgfCreationDto } from "../dtos/dpgf/DpgfCreationDto";
import { DpgfStatusEnum } from "../enums/DpgfStatusEnum";

export const DpgfContext = React.createContext<DpgfStore>({} as DpgfStore);

export function DpgfContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { postNewDpgf, fetchAllDpgf, putDpgfStatus, deleteDpgfById } =
    useDpgf();

  const [dpgf, setDpgf] = useState<DpgfDto | undefined>(undefined);
  const [dpgfList, setDpgfList] = useState<DpgfDto[]>([]);
  const [isDpgfListLoading, setIsDpgfListLoading] = useState<boolean>(false);

  const createNewDpgf = useCallback(
    async (formData: DpgfCreationDto): Promise<DpgfDto> => {
      const response = await postNewDpgf(formData);
      setDpgf(response);
      return response;
    },
    [postNewDpgf]
  );

  const getAllDpgf = useCallback(async () => {
    setIsDpgfListLoading(true);
    fetchAllDpgf()
      .then((newDpgfList) => setDpgfList(newDpgfList))
      .finally(() => setIsDpgfListLoading(false));
  }, [fetchAllDpgf]);

  useEffect(() => {
    getAllDpgf();
  }, [getAllDpgf]);

  const updateDpgfStatus = useCallback(
    async (dpgfId: string, dpgfStatus: DpgfStatusEnum) => {
      await putDpgfStatus(dpgfId, dpgfStatus);
      setDpgf((prev) => (prev ? { ...prev, dpgfStatus: dpgfStatus } : prev));
      setDpgfList((prev) =>
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
      setDpgfList((prev) => prev?.filter((dpgf) => dpgf.id !== dpgfId) ?? []);
    },
    [deleteDpgfById]
  );

  const dpgfStore: DpgfStore = useMemo(
    () => ({
      dpgf,
      dpgfList,
      isDpgfListLoading,
      setDpgf,
      setDpgfList,
      createNewDpgf,
      updateDpgfStatus,
      deleteDpgf,
    }),
    [
      dpgf,
      dpgfList,
      isDpgfListLoading,
      setDpgf,
      setDpgfList,
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
  dpgfList: DpgfDto[];
  isDpgfListLoading: boolean;
  setDpgf: Dispatch<SetStateAction<DpgfDto | undefined>>;
  setDpgfList: Dispatch<SetStateAction<DpgfDto[]>>;
  createNewDpgf(formData: DpgfCreationDto): Promise<DpgfDto>;
  updateDpgfStatus(dpgfId: string, dpgfStatus: DpgfStatusEnum): Promise<void>;
  deleteDpgf(dpgfId: string): Promise<void>;
}>;
