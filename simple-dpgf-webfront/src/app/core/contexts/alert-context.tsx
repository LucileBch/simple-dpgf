/* eslint-disable react-refresh/only-export-components */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import AlertSnack from "../../components/alert/AlertSnack";
import { AlertColor, AlertPropsColorOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { getErrorMessage } from "../utils/error-handler";

export const AlertContext = React.createContext<AlertStore>({} as AlertStore);

export function AlertContextProvider({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [severity, setSeverity] =
    useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides>>(
      "error"
    );

  const handleCloseAlert = useCallback(() => {
    setOpenAlert(false);
    setAlertMessage(null);
  }, []);

  const handleErrorAlert = useCallback(
    (error: unknown) => {
      if (error instanceof Error) {
        setAlertMessage(getErrorMessage(error.message));
        setSeverity("error");
        setOpenAlert(true);
      }
    },
    [setAlertMessage, setSeverity, setOpenAlert]
  );

  const handleSuccessAlert = useCallback((message: string) => {
    setAlertMessage(message);
    setSeverity("success");
    setOpenAlert(true);
  }, []);

  const alertStore: AlertStore = useMemo(
    () => ({
      alertMessage,
      setAlertMessage,
      setSeverity,
      setOpenAlert,
      handleErrorAlert,
      handleSuccessAlert,
    }),
    [
      alertMessage,
      setAlertMessage,
      setSeverity,
      setOpenAlert,
      handleErrorAlert,
      handleSuccessAlert,
    ]
  );

  return (
    <AlertContext.Provider value={alertStore}>
      {children}
      <AlertSnack
        open={openAlert}
        onClose={handleCloseAlert}
        severity={severity}
        message={alertMessage}
      />
    </AlertContext.Provider>
  );
}

export type AlertStore = {
  alertMessage: string | null;
  setAlertMessage: Dispatch<SetStateAction<string | null>>;
  setSeverity: Dispatch<
    SetStateAction<OverridableStringUnion<AlertColor, AlertPropsColorOverrides>>
  >;
  setOpenAlert: Dispatch<SetStateAction<boolean>>;
  handleErrorAlert: (error: unknown) => void;
  handleSuccessAlert: (message: string) => void;
};
