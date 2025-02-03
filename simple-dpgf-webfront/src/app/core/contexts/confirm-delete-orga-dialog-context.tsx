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

export const ConfirmDialogContext = React.createContext<ConfirmDialogStore>(
  {} as ConfirmDialogStore
);

export function ConfirmDialogContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const navigate = useNavigate();

  const { deleteOrganizationById } = useOrganization();

  const { setOrganizationList } = useContext(OrganizationContext);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const [organizationId, setOrganizationId] = useState<string | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleCancelAndClose = useCallback(() => {
    setIsConfirmDialogOpen(false);
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
    setIsConfirmDialogOpen(false);
    setIsSubmitting(false);
  }, [
    deleteOrganizationById,
    isSubmitting,
    navigate,
    organizationId,
    setOrganizationList,
  ]);

  const confirmDialogStore: ConfirmDialogStore = useMemo(
    () => ({
      isConfirmDialogOpen,
      setIsConfirmDialogOpen,
      handleCancelAndClose,
      handleSubmitAndClose,
      setOrganizationId,
    }),
    [
      isConfirmDialogOpen,
      setIsConfirmDialogOpen,
      handleCancelAndClose,
      handleSubmitAndClose,
      setOrganizationId,
    ]
  );

  return (
    <ConfirmDialogContext.Provider value={confirmDialogStore}>
      {children}
      <AlertSnack
        open={openAlert}
        onClose={handleCloseAlert}
        severity={message?.startsWith("Une erreur") ? "error" : "success"}
        message={message}
      />
    </ConfirmDialogContext.Provider>
  );
}

export type ConfirmDialogStore = {
  isConfirmDialogOpen: boolean;
  setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleCancelAndClose(): void;
  handleSubmitAndClose(): void;
  setOrganizationId: Dispatch<SetStateAction<string | undefined>>;
};
