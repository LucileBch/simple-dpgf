/* eslint-disable react-refresh/only-export-components */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import AlertSnack from "../../components/alert/AlertSnack";

export const DialogContext = React.createContext<DialogStore>(
  {} as DialogStore
);

export function DialogContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleCloseAlert = useCallback(() => {
    setOpenAlert(false);
  }, []);

  const handleCancelAndClose = useCallback(() => {
    setIsCreateDialogOpen(false);
    setIsUpdateDialogOpen(false);
    setIsDeleteDialogOpen(false);
  }, []);

  const dialogStore: DialogStore = useMemo(
    () => ({
      isCreateDialogOpen,
      isUpdateDialogOpen,
      isDeleteDialogOpen,
      isSubmitting,
      setIsSubmitting,
      setIsDeleteDialogOpen,
      setIsUpdateDialogOpen,
      setIsCreateDialogOpen,
      setAlertMessage,
      setOpenAlert,
      handleCancelAndClose,
    }),
    [
      isCreateDialogOpen,
      isUpdateDialogOpen,
      isDeleteDialogOpen,
      isSubmitting,
      setIsSubmitting,
      setIsDeleteDialogOpen,
      setIsUpdateDialogOpen,
      setIsCreateDialogOpen,
      setAlertMessage,
      setOpenAlert,
      handleCancelAndClose,
    ]
  );

  return (
    <DialogContext.Provider value={dialogStore}>
      {children}
      <AlertSnack
        open={openAlert}
        onClose={handleCloseAlert}
        severity={alertMessage?.startsWith("Une erreur") ? "error" : "success"}
        message={alertMessage}
      />
    </DialogContext.Provider>
  );
}

export type DialogStore = {
  isCreateDialogOpen: boolean;
  isUpdateDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
  setAlertMessage: Dispatch<SetStateAction<string | null>>;
  setOpenAlert: Dispatch<SetStateAction<boolean>>;
  handleCancelAndClose(): void;
};
