import { TableCell, TableHead, TableRow } from "@mui/material";

export default function ProductTableHead(): JSX.Element {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ padding: "4px 10px" }}>Nom</TableCell>{" "}
        <TableCell sx={{ padding: "4px 10px" }}>Unité</TableCell>
        <TableCell sx={{ padding: "4px 10px" }}>Quantité</TableCell>
        <TableCell sx={{ padding: "4px 10px" }}>Prix Unitaire (€)</TableCell>
        <TableCell sx={{ padding: "4px 10px" }}>Total (€)</TableCell>
      </TableRow>
    </TableHead>
  );
}
