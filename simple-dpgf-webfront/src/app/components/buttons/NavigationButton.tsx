import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

interface IProps {
  label: string;
  path: string;
  disabled?: boolean;
}

export default function NavigationButton({
  label,
  path,
  disabled = false,
}: IProps): JSX.Element {
  return (
    // entourer d'un Link !!

    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        pt: 1,
      }}
    >
      <Link to={path}>
        <Button variant="contained" disabled={disabled}>
          {label}
        </Button>
      </Link>
    </Box>
  );
}
