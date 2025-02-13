/* eslint-disable react-refresh/only-export-components */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { OrganizationDto } from "../dtos/organization/OrganizationDto";
import { useOrganization } from "../hooks/use-organization";
import { useParams } from "react-router-dom";

export const OrganizationContext = React.createContext<OrganizationStore>(
  {} as OrganizationStore
);

export function OrganizationContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { organizationId } = useParams();

  const { fetchOrganizationList, fetchOrganizationById } = useOrganization();

  const [organizationList, setOrganizationList] = useState<OrganizationDto[]>(
    []
  );
  const [isOrganizationListLoading, setIsOrganizationListLoading] =
    useState<boolean>(false);
  const [organization, setOrganization] = useState<OrganizationDto | undefined>(
    undefined
  );
  const [isOrganizationLoading, setIsOrganizationLoading] =
    useState<boolean>(false);

  const getOrganizationList = useCallback(() => {
    setIsOrganizationListLoading(true);
    fetchOrganizationList()
      .then((newOrganizationList) => setOrganizationList(newOrganizationList))
      .finally(() => setIsOrganizationListLoading(false));
  }, [fetchOrganizationList]);

  useEffect(() => {
    getOrganizationList();
  }, [getOrganizationList]);

  useEffect(() => {
    if (organizationId) {
      setIsOrganizationLoading(true);
      fetchOrganizationById(organizationId)
        .then((organization) => setOrganization(organization))
        .finally(() => setIsOrganizationLoading(false));
    }
  }, [fetchOrganizationById, organizationId]);

  const organizationStore: OrganizationStore = useMemo(
    () => ({
      organizationList,
      setOrganizationList,
      isOrganizationListLoading,
      organization,
      setOrganization,
      isOrganizationLoading,
    }),
    [
      organizationList,
      setOrganizationList,
      isOrganizationListLoading,
      organization,
      setOrganization,
      isOrganizationLoading,
    ]
  );

  return (
    <OrganizationContext.Provider value={organizationStore}>
      {children}
    </OrganizationContext.Provider>
  );
}

export type OrganizationStore = {
  organizationList: OrganizationDto[];
  setOrganizationList: Dispatch<SetStateAction<OrganizationDto[]>>;
  isOrganizationListLoading: boolean;
  organization: OrganizationDto | undefined;
  setOrganization: Dispatch<SetStateAction<OrganizationDto | undefined>>;
  isOrganizationLoading: boolean;
};
