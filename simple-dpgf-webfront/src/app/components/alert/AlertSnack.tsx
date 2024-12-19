import { Alert, Snackbar } from "@mui/material";
//import Alert from '@mui/material/Alert';

interface IAlertSnackProps {
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  severity: "error" | "warning" | "info" | "success";
  errorMessage: string | null;
}

export default function AlertSnack({
  anchorOrigin = { vertical: "top", horizontal: "right" },
  open,
  autoHideDuration = 3000,
  onClose,
  severity,
  errorMessage,
}: IAlertSnackProps): JSX.Element {
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
