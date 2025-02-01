import { Box, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  label: string;
  path?: string;
  disabled?: boolean;
  onClick?(): void;
}

export default function NavigationButton({
  label,
  path,
  disabled = false,
  onClick,
}: Readonly<IProps>): JSX.Element {
  const theme = useTheme();
  const location = useLocation();
  const isActive = location.pathname === path;

  const button = (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      sx={{
        backgroundColor: isActive
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
      }}
    >
      {label}
    </Button>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        alignContent: "center",
      }}
    >
      {path ? <Link to={path}>{button}</Link> : button}
    </Box>
  );
}
