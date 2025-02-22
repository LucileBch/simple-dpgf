import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  Snackbar,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

interface IProps {
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  message: string | null;
}

export default function AlertSnack({
  anchorOrigin = { vertical: "top", horizontal: "right" },
  open,
  autoHideDuration = 3000,
  onClose,
  severity,
  message: errorMessage,
}: Readonly<IProps>): JSX.Element {
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
