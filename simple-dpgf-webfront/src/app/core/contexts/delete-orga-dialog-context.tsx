/* eslint-disable react-refresh/only-export-components */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AlertSnack from "../../components/alert/AlertSnack";
import { pagesUrl } from "../appConstants";
import { useOrganization } from "../hooks/use-organization";
import { OrganizationContext } from "./organization-context";

export const DeleteOrgaDialogContext =
  React.createContext<DeleteOrgaDialogStore>({} as DeleteOrgaDialogStore);

export function ConfirmDialogContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const navigate = useNavigate();

  const { deleteOrganizationById } = useOrganization();

  const { setOrganizationList } = useContext(OrganizationContext);

  const [isDeleteOrgaDialogOpen, setIsDeleteOrgaDialogOpen] =
    useState<boolean>(false);
  const [organizationId, setOrganizationId] = useState<string | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleCloseAlert = useCallback(() => {
    setOpenAlert(false);
  }, []);

  const handleCancelAndClose = useCallback(() => {
    setIsDeleteOrgaDialogOpen(false);
  }, []);

  const handleSubmitAndClose = useCallback(async () => {
    if (isSubmitting || !organizationId) {
      return;
    }
    setIsSubmitting(true);
    setMessage(null);
    setOpenAlert(false);

    try {
      await deleteOrganizationById(organizationId);
      setMessage("Organisation supprimée");
      setOpenAlert(true);

      setOrganizationList((prev) =>
        prev.filter((organization) => organization.id !== organizationId)
      );

      setTimeout(() => {
        navigate(pagesUrl.ADMIN_ORGANIZATIONS_PAGE);
      }, 2000);
    } catch (error) {
      console.log("error dialo confirm context", error);
      setMessage("Une erreur est survenue");
      setOpenAlert(true);
    }
    setIsDeleteOrgaDialogOpen(false);
    setIsSubmitting(false);
  }, [
    deleteOrganizationById,
    isSubmitting,
    navigate,
    organizationId,
    setOrganizationList,
  ]);

  const deleteOrgaDialogStore: DeleteOrgaDialogStore = useMemo(
    () => ({
      isDeleteOrgaDialogOpen,
      setIsDeleteOrgaDialogOpen,
      setOrganizationId,
      handleCancelAndClose,
      handleSubmitAndClose,
    }),
    [
      isDeleteOrgaDialogOpen,
      setIsDeleteOrgaDialogOpen,
      setOrganizationId,
      handleCancelAndClose,
      handleSubmitAndClose,
    ]
  );

  return (
    <DeleteOrgaDialogContext.Provider value={deleteOrgaDialogStore}>
      {children}
      <AlertSnack
        open={openAlert}
        onClose={handleCloseAlert}
        severity={message?.startsWith("Une erreur") ? "error" : "success"}
        message={message}
      />
    </DeleteOrgaDialogContext.Provider>
  );
}

export type DeleteOrgaDialogStore = {
  isDeleteOrgaDialogOpen: boolean;
  setIsDeleteOrgaDialogOpen: Dispatch<SetStateAction<boolean>>;
  setOrganizationId: Dispatch<SetStateAction<string | undefined>>;
  handleCancelAndClose(): void;
  handleSubmitAndClose(): void;
};
