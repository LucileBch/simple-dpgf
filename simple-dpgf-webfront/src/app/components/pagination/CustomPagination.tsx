import { Box, Pagination } from "@mui/material";
import React from "react";

interface IProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function CustomPagination({
  count,
  page,
  onChange,
}: Readonly<IProps>): React.JSX.Element {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
      <Pagination count={count} page={page} onChange={onChange} />
    </Box>
  );
}
