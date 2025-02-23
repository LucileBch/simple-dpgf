import { Box, TextField } from "@mui/material";
import TitleH2 from "../typographies/TitleH2";

interface IProps {
  title: string;
  inputLabel: string;
  searchValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PageTitleWithFilter({
  title,
  inputLabel,
  searchValue,
  onChange,
}: Readonly<IProps>): JSX.Element {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <TitleH2>{title}</TitleH2>
      <TextField
        label={inputLabel}
        variant="outlined"
        sx={{ marginBottom: 2 }}
        value={searchValue}
        onChange={onChange}
      />
    </Box>
  );
}
