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
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // ?????
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleCloseAlert = useCallback(() => {
    setOpenAlert(false);
  }, []);

  const handleCancelAndClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const dialogStore: DialogStore = useMemo(
    () => ({
      isDialogOpen,
      isSubmitting,
      setIsSubmitting,
      setIsDialogOpen,
      setAlertMessage,
      setOpenAlert,
      handleCancelAndClose,
    }),
    [
      isDialogOpen,
      isSubmitting,
      setIsSubmitting,
      setIsDialogOpen,
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
  isDialogOpen: boolean;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  setAlertMessage: Dispatch<SetStateAction<string | null>>;
  setOpenAlert: Dispatch<SetStateAction<boolean>>;
  handleCancelAndClose(): void;
};
